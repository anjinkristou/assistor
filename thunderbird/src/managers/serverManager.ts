import axios, { AxiosError } from 'axios';

// const baseURL = "http://kris2assistor.herokuapp.com";
const baseURL = "http://localhost:3000";

declare var messenger: any

interface LoginToken {
    access_token: string;
    refresh_token: string;
  }

  
class ServerManager {
    constructor() {
    }

    async login(username: string, password: string) {
        try{
            const response = await axios.post<LoginToken>(`${baseURL}/auth/login`, { username, password })
            const { access_token, refresh_token } = response.data;

            await messenger.storage.local.set({ access_token, refresh_token });

            return [true, ""];
        } catch (error: any) {
            let message = error.message;
            if(error.response){
            const response = error.response;
            message = response.data.msg;
            }
            return [false, message];
        }
    }

    async getList(resource:string, filter: any) {
        try{
            let { access_token } = await messenger.storage.local.get({ access_token: "" });
            const config = {
                headers: { Authorization: `Bearer ${access_token}` },
                params: { filter, pagination: {page: 1, perPage: 50}, sort: {} },
            };
            const response = await axios.get(`${baseURL}/${resource}/list`, config)

            return [true, response.data];
        } catch (error: any) {
            console.log(error);
            let message = error.message;
            if(error.response){
                const response = error.response;
                message = response.data.msg;
            }
            return [false, message];
        }
    }
};

export const serverManager = new ServerManager();