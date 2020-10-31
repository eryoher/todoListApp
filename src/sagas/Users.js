import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    CREATE_USER, DELETE_USER,
    GET_ALL_USERS, UPDATE_USER
} from '../constants/ActionsTypes';

import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} from '../apis/Users'

import {
    createUserSuccess, deleteUserSuccess,
    getAllUsersSuccess, updateUserSuccess
} from '../actions';


function* getAllUsersRequest({payload}) {
    try {
        const users = yield call(getAllUsers, payload);
        yield put(getAllUsersSuccess(users));
    } catch (error) {
    }
}

function* createUserRequest({payload}) {
    try {
        const user = yield call(createUser, payload);
        yield put(createUserSuccess(user));
    } catch (error) {
    }
}

function* updateUserRequest({payload}) {
    try {
        const user = yield call(updateUser, payload);
        yield put(updateUserSuccess(user) );
    } catch (error) {
        console.log(error);
    }
}

function* deleteUserRequest({payload}) {
    try {
        const user = yield call(deleteUser, payload);
        yield put(deleteUserSuccess(user) );
    } catch (error) {
    }
}

export function* getAllUsersSaga() {
    yield takeEvery(GET_ALL_USERS , getAllUsersRequest);
}

export function* createUserSaga() {
    yield takeEvery(CREATE_USER, createUserRequest);
}

export function* updateUserSaga() {
    yield takeEvery(UPDATE_USER, updateUserRequest);
}

export function* deleteUserSaga() {
    yield takeEvery(DELETE_USER, deleteUserRequest);
}

export default function* rootSaga() {
    yield all([
        fork(getAllUsersSaga),
        fork(createUserSaga),
        fork(updateUserSaga),
        fork(deleteUserSaga),
    ]);
}