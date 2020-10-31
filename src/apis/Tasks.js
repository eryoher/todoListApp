import Axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL_TASKS;

export const createTasks = async (params) => {
    const response = await Axios.post(`${apiURL}/userTasks`, params);
    return response.data;
}

export const getTasks = async (params) => {
    const response = await Axios.get(`${apiURL}/userTasks/getTasksByUser`, { params });
    return response.data;
}

export const updateTasks = async (params) => {
    const response = await Axios.post(`${apiURL}/userTasks/updateTasks/`, params);
    return response.data
}