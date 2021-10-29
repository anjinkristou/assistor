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


const getList = async (resource: string, params: any): Promise<GetListResult<any>> => {
    try{
        const response = await axios.get<GetListResult<any>>(`/${resource}/list`, { params })
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        if (response.status == 401) {
            const { msg } = error.response.data;
            return Promise.reject(msg);
        }
        return Promise.reject(error);
    }
};

const getOne = async (resource: string, params: any): Promise<GetOneResult<any>> => {
    try{
        const response = await axios.get<GetOneResult<any>>(`/${resource}/item`, { params })
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        if (response.status == 401) {
            const { msg } = error.response.data;
            return Promise.reject(msg);
        }
        return Promise.reject(error);
    }
};

const getMany = async (resource: string, params: any): Promise<GetManyResult<any>> => {
    try{
        const response = await axios.get<GetManyResult<any>>(`/${resource}/items`, { params })
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        if (response.status == 401) {
            const { msg } = error.response.data;
            return Promise.reject(msg);
        }
        return Promise.reject(error);
    }
};

const getManyReference = async (resource: string, params: any): Promise<GetManyReferenceResult<any>>  => {
    try{
        const response = await axios.get<GetManyReferenceResult<any>>(`/${resource}/refs`, { params })
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        if (response.status == 401) {
            const { msg } = error.response.data;
            return Promise.reject(msg);
        }
        return Promise.reject(error);
    }
};

const create = async (resource: string, params: any): Promise<CreateResult<any>> => {
    try{
        const response = await axios.post<CreateResult<any>>(`/${resource}/item`, { params })
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        if (response.status == 401) {
            const { msg } = error.response.data;
            return Promise.reject(msg);
        }
        return Promise.reject(error);
    }
};

const update = async (resource: string, params: any): Promise<UpdateResult<any>> => {
    try{
        const response = await axios.put<UpdateResult<any>>(`/${resource}/item`, { params })
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        if (response.status == 401) {
            const { msg } = error.response.data;
            return Promise.reject(msg);
        }
        return Promise.reject(error);
    }
};

const updateMany = async (resource: string, params: any): Promise<UpdateManyResult> => {
    try{
        const response = await axios.put<UpdateManyResult>(`/${resource}/items`, { params })
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        if (response.status == 401) {
            const { msg } = error.response.data;
            return Promise.reject(msg);
        }
        return Promise.reject(error);
    }
};

const deleteOne = async (resource: string, params: any): Promise<DeleteResult<any>> => {
    try{
        const response = await axios.delete<DeleteResult<any>>(`/${resource}/item`, { params })
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        if (response.status == 401) {
            const { msg } = error.response.data;
            return Promise.reject(msg);
        }
        return Promise.reject(error);
    }
};

const deleteMany = async (resource: string, params: any): Promise<DeleteManyResult> => {
    try{
        const response = await axios.delete<DeleteManyResult>(`/${resource}/items`, { params })
        return Promise.resolve(response.data);
    } catch (error: any) {
        const response = error.response;
        if (response.status == 401) {
            const { msg } = error.response.data;
            return Promise.reject(msg);
        }
        return Promise.reject(error);
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
}
