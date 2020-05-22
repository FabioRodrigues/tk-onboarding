import axios from 'axios'
import {ApiConfigs} from '../config/ApiConfigs'

export interface RecipePayload {
    id: number,
    name: string,
    description: string,
    ingredients: Array<RecipePayloadIngredient>
}

export interface RecipePayloadIngredient {
    name: string
}

const list = async (): Promise<Array<RecipePayload>> => {
    let result = await axios.get(`${ApiConfigs.BaseUrl}/recipes`)
    if(result.status !== 200){
        handleError(result.data);
        return Promise.reject();
    }

    return result.data;
};

const get = async (id: number): Promise<RecipePayload> => {
    let result = await axios.get(`${ApiConfigs.BaseUrl}/recipes/${id}`)
    if(result.status !== 200){
        handleError(result.data);
        return Promise.reject();
    }

    return result.data;
};

const remove = async (id: any): Promise<boolean> => {
    let result = await axios.delete(`${ApiConfigs.BaseUrl}/recipes/${id}`)
    if(result.status < 200 || result.status >= 300){
        handleError(result.data);
        return Promise.reject();
    }

    return true;
};

const save = async(payload: any): Promise<any> =>{
    let result = await axios.post(`${ApiConfigs.BaseUrl}/recipes/`, payload);
    if(result.status !== 201){
        handleError(result.data);
        return Promise.reject();
    }
    return result.data;
}

const update = async(id: any, payload: any): Promise<any> =>{
    let result = await axios.patch(`${ApiConfigs.BaseUrl}/recipes/${id}`, payload);
    if(result.status < 200 || result.status >= 300){
        handleError(result.data);
        return Promise.reject();
    }
    return result.data;
}

function handleError(data: any){
    console.log(data);
}

export const RecipeService = {
    get,
    list,
    remove,
    save,
    update
};