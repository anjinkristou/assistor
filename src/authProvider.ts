import { AuthProvider } from 'react-admin';
import decodeJwt, { JwtPayload } from 'jwt-decode';
import axios, { AxiosError } from 'axios';
import {
    isAuthenticated,
    setCredentials,
    getCredentials,
    removeCredentials,
} from "./auth"

const baseURL = "/auth";

interface Permission {
    permissions: string;
}

interface LoginToken {
    access_token: string;
    refresh_token: string;
}

interface RefreshToken {
    access_token: string;
}

interface UserIdentity {
    id: number;
    fullName: string;
    avatar: string;
}

const login = async ({ username, password }: {username: string; password:string;}) => {
    try{
        const response = await axios.post<LoginToken>(`${baseURL}/login`, { username, password })
        const { access_token, refresh_token } = response.data;
        const decodedToken = decodeJwt<Permission>(access_token);
        setCredentials({
            access_token,
            refresh_token,
            permissions: decodedToken.permissions,
        });
        return Promise.resolve();
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const getIdentity = async () => { 
    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let response = await axios.get<UserIdentity>(`${baseURL}/user`, config)
        const { id, fullName, avatar } = response.data;
        
        return Promise.resolve({ id, fullName, avatar });
    } catch (error: any) {
        const response = error.response;
        removeCredentials();
        return Promise.reject({message: response.data, status: response.status});
    }
 };

 const checkError = async ({ status }: any) => {
    if (status === 401 || status === 403 || status === 422) {
        const credentials = getCredentials();
        if(!credentials) return Promise.reject();

        const token = credentials?.refresh_token;
        try{
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            let response = await axios.post<RefreshToken>(`${baseURL}/refresh`, undefined, config)
            const { access_token } = response.data;
            setCredentials({
                ...credentials,
                access_token: access_token,
            });
        } catch (error: any) {
            return Promise.reject();
        }
    }
    return Promise.resolve();
};

export const authProvider: AuthProvider =  {
    login: login,
    checkError: checkError,
    checkAuth: () => (isAuthenticated() ? Promise.resolve() : Promise.reject()),
    logout: async () => {
        await axios.get(`${baseURL}/logout`)
        removeCredentials();
        return Promise.resolve();
    },
    getIdentity: getIdentity,
    getPermissions: () => {
        const credentials = getCredentials();
        const permissions = credentials?.permissions;
        return permissions ? Promise.resolve(permissions) : Promise.reject();
    }
};