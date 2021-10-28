import { AuthProvider } from 'react-admin';
import decodeJwt, { JwtPayload } from 'jwt-decode';
import axios, { AxiosError } from 'axios';

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

export const authProvider: AuthProvider =  {
    login: async ({ username, password }) => {
        try{
            const response = await axios.post<Token>(`${baseURL}/login`, { username, password })
            const { token } : { token: any;} = response.data;
            const decodedToken = decodeJwt<Permission>(token);
            localStorage.setItem('token', token);
            localStorage.setItem('permissions', decodedToken.permissions);
            return Promise.resolve();
        } catch (error: any) {
            const response = error.response;
            if (response.status == 401) {
                const { msg } = error.response.data;
                return Promise.reject(msg);
            }
            return Promise.reject(error);
        }
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    },
    getIdentity: async () => { 
        try{
            const token = localStorage.getItem('token') 
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            let response = await axios.get<UserIdentity>(`${baseURL}/user`, config)
            const { id, fullName, avatar } = response.data;
            console.log(response.data)
            
            return Promise.resolve({ id, fullName, avatar });
        } catch (error: any) {
            const response = error.response;
            if (response.status == 401) {

                localStorage.removeItem('token');
                localStorage.removeItem('permissions');

                const { msg } = response.data;
                return Promise.reject(msg);
            }
            return Promise.reject(error);
        }
     },
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    }
};