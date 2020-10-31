import {
    GET_ALL_USERS,
    GET_ALL_USERS_SUCCESS,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS, DELETE_USER, DELETE_USER_SUCCESS
} from '../constants/ActionsTypes';

export const getAllUsers = (params) => {
    return {
        type: GET_ALL_USERS,
        payload: params
    };
};

export const getAllUsersSuccess = (response) => {
    return {
        type: GET_ALL_USERS_SUCCESS,
        payload: response
    }
};

export const createUser = (params) => {
    return {
        type: CREATE_USER,
        payload: params
    };
};

export const createUserSuccess = (response) => {
    return {
        type: CREATE_USER_SUCCESS,
        payload: response
    }
};

export const updateUser = (params) => {
    return {
        type: UPDATE_USER,
        payload: params
    };
};

export const updateUserSuccess = (response) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: response
    }
};

export const deleteUser = (params) => {
    return {
        type: DELETE_USER,
        payload: params
    };
};

export const deleteUserSuccess = (response) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: response
    }
};