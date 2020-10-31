import {
    CREATE_TASKS,
    CREATE_TASKS_SUCCESS,
    GET_TASKS,
    GET_TASKS_SUCCESS,
    UPDATE_TASKS,
    UPDATE_TASKS_SUCCESS
} from '../constants/ActionsTypes';

export const createTasks = (params) => {
    return {
        type: CREATE_TASKS,
        payload: params
    };
};

export const createTasksSuccess = (response) => {
    return {
        type: CREATE_TASKS_SUCCESS,
        payload: response
    }
};

export const getTasks = (params) => {
    return {
        type: GET_TASKS,
        payload: params
    };
};

export const getTasksSuccess = (response) => {
    return {
        type: GET_TASKS_SUCCESS,
        payload: response
    }
};


export const updateTasks = (params) => {
    return {
        type: UPDATE_TASKS,
        payload: params
    };
};

export const updateTasksSuccess = (response) => {
    return {
        type: UPDATE_TASKS_SUCCESS,
        payload: response
    }
};
