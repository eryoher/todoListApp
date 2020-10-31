import Axios from 'axios';
const  apiURL =  process.env.REACT_APP_API_URL_USERS;


export const getAllUsers = async (params) => {
    
    const response = await Axios.get(`${apiURL}/users/getUsers`, {params});
    return response.data;
}

export const createUser = async (params) => {    
    const response = await Axios.post(`${apiURL}/users`, params);
    return response.data;
}

export const updateUser = async (params) => {
    const response = await Axios.put(`${apiURL}/users/${params.userEdit}`, params);
    return response.data;
}

export const deleteUser = async (params) => {
    const response = await Axios.delete(`${apiURL}/users/${params.id}`);
    return response.data;
}
