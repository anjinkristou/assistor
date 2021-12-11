import axios, { AxiosError } from 'axios';
import { 
    GetListResult,
    GetOneResult,
    GetManyResult,
    GetManyReferenceResult,
    CreateResult,
    UpdateResult,
    UpdateManyResult,
    DeleteResult,
    DeleteManyResult,
    Identifier,
}  from 'react-admin'

import {
    getCredentials, 
    isTokenValid,
} from "./auth"

import { refreshToken } from './authProvider';

const refreshTokenIfInvalid = () => {
    const credentials = getCredentials();
    const token = credentials?.access_token;

    if(token && !isTokenValid(token)){
        refreshToken();
    }
}


const getList = async (resource: string, params: any): Promise<GetListResult<any>> => {
    refreshTokenIfInvalid();

    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params,
        };
        const response = await axios.get<GetListResult<any>>(`/${resource}/list`, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const getOne = async (resource: string, params: any): Promise<GetOneResult<any>> => {
    refreshTokenIfInvalid();

    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params,
        };
        const response = await axios.get<GetOneResult<any>>(`/${resource}/item`, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const getMany = async (resource: string, params: any): Promise<GetManyResult<any>> => {
    refreshTokenIfInvalid();
    
    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params,
        };
        const response = await axios.get<GetManyResult<any>>(`/${resource}/items`, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const getManyReference = async (resource: string, params: any): Promise<GetManyReferenceResult<any>>  => {
    refreshTokenIfInvalid();
    
    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params,
        };
        const response = await axios.get<GetManyReferenceResult<any>>(`/${resource}/refs`, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const create = async (resource: string, params: any): Promise<CreateResult<any>> => {
    refreshTokenIfInvalid();
    
    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.post<CreateResult<any>>(`/${resource}/item`, params, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const update = async (resource: string, params: any): Promise<UpdateResult<any>> => {
    refreshTokenIfInvalid();
    
    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.put<UpdateResult<any>>(`/${resource}/item`, params, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const updateMany = async (resource: string, params: any): Promise<UpdateManyResult> => {
    refreshTokenIfInvalid();
    
    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.put<UpdateManyResult>(`/${resource}/items`, params, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const deleteOne = async (resource: string, params: any): Promise<DeleteResult<any>> => {
    refreshTokenIfInvalid();
    
    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params,
        };
        const response = await axios.delete<DeleteResult<any>>(`/${resource}/item`, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const deleteMany = async (resource: string, params: any): Promise<DeleteManyResult> => {
    refreshTokenIfInvalid();
    
    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params,
        };
        const response = await axios.delete<DeleteManyResult>(`/${resource}/items`, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const fetchLinkedinCompany = async (company_id: Identifier): Promise<any> => {
    refreshTokenIfInvalid();

    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params: {id: company_id },
        };
        const response = await axios.get<any>(`/linkedin/company/fetch`, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const loginLinkedin = async (): Promise<any> => {
    refreshTokenIfInvalid();

    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get<any>(`/linkedin/login`, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const verifyLoginLinkedin = async (pin: string) : Promise<any> => {
    refreshTokenIfInvalid();
    
    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const params = {
            pin
        }
        const response = await axios.post<any>(`/linkedin/login/verify`, params, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

export const dataProvider = {
    getList:    getList,
    getOne:     getOne,
    getMany:    getMany,
    getManyReference: getManyReference,
    create:     create,
    update:     update,
    updateMany: updateMany,
    delete:     deleteOne,
    deleteMany: deleteMany,
    // Linkedin
    fetchLinkedinCompany: fetchLinkedinCompany,
    loginLinkedin: loginLinkedin,
    verifyLoginLinkedin: verifyLoginLinkedin,
}
