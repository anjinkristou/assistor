import decodeJwt from 'jwt-decode';
import axios from 'axios';

const baseURL = "/auth";

export default {
    login: async ({ username, password }) => {
        try{
            let response = await axios.post(`${baseURL}/login`, { username, password })
            const { token } = response.data;
            const decodedToken = decodeJwt(token);
            localStorage.setItem('token', token);
            localStorage.setItem('permissions', decodedToken.permissions);
            return Promise.resolve();
        } catch (error) {
            const response = error.response;
            if (response.status == 401) {
                const { msg } = response.data;
                return Promise.reject(msg);
            }
            return Promise.reject(error);
        }
    },
    checkError: (error) => { 

     },
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
            let response = await axios.get(`${baseURL}/user`, config)
            const { id, fullName, avatar } = response.data;
            console.log(response.data)
            
            return Promise.resolve({ id, fullName, avatar });
        } catch (error) {
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