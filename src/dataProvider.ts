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
}  from 'react-admin'

import {
    getCredentials,
} from "./auth"


const getList = async (resource: string, params: any): Promise<GetListResult<any>> => {
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

const createMany = async (resource: string, params: any): Promise<CreateResult<any>> => {
    try{
        const credentials = getCredentials();
        const token = credentials?.access_token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.post<CreateResult<any>>(`/${resource}/items`, params, config)
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        return Promise.reject({message: response.data, status: response.status});
    }
};

const update = async (resource: string, params: any): Promise<UpdateResult<any>> => {
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

export const dataProvider = {
    getList:    getList,
    getOne:     getOne,
    getMany:    getMany,
    getManyReference: getManyReference,
    create:     create,
    createMany: createMany,
    update:     update,
    updateMany: updateMany,
    delete:     deleteOne,
    deleteMany: deleteMany,
}
