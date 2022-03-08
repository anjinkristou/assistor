import axios, { AxiosError } from 'axios';

const baseURL = "http://kris2assistor.herokuapp.com/auth";

interface LoginToken {
    access_token: string;
    refresh_token: string;
  }

  
class ServerManager {
    access_token: string;
    refresh_token: string;
    constructor() {
        this.access_token = "";
        this.refresh_token = "";
    }

    async login(username: string, password: string) {
        try{
            const response = await axios.post<LoginToken>(`${baseURL}/login`, { username, password })
            const { access_token, refresh_token } = response.data;
            
            this.access_token = access_token;
            this.refresh_token = refresh_token;

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
};

export const serverManager = new ServerManager();