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

interface Token {
    token: string;
}

interface UserIdentity {
    id: number;
    fullName: string;
    avatar: string;
}

const login = async ({ username, password }: {username: string; password:string;}) => {
    try{
        const response = await axios.post<Token>(`${baseURL}/login`, { username, password })
        const { token } : { token: any;} = response.data;
        const decodedToken = decodeJwt<Permission>(token);
        setCredentials({
            token: token,
            permissions: decodedToken.permissions,
        });
        return Promise.resolve();
    } catch (error: any) {
        const response = error.response;
        if (response.status == 401) {
            const { msg } = error.response.data;
            return Promise.reject(msg);
        }
        return Promise.reject(error);
    }
}

export const authProvider: AuthProvider =  {
    login: login,
    checkError: ({ status }: any) => {
        if (status === 401 || status === 403) {
            removeCredentials();
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return isAuthenticated() ? Promise.resolve() : Promise.reject();
    },
    logout: () => {
        removeCredentials();
        return Promise.resolve();
    },
    getIdentity: async () => { 
        try{
            const credentials = getCredentials();
            const token = credentials?.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            let response = await axios.get<UserIdentity>(`${baseURL}/user`, config)
            const { id, fullName, avatar } = response.data;
            
            return Promise.resolve({ id, fullName, avatar });
        } catch (error: any) {
            const response = error.response;
            if (response.status == 401) {
                removeCredentials();
                const { msg } = response.data;
                return Promise.reject(msg);
            }
            return Promise.reject(error);
        }
     },
    getPermissions: () => {
        const credentials = getCredentials();
        const permissions = credentials?.permissions;
        return permissions ? Promise.resolve(permissions) : Promise.reject();
    }
};