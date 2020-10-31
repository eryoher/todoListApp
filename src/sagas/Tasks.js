import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { createTasksSuccess, getTasksSuccess, updateTasksSuccess } from '../actions';
import { CREATE_TASKS, GET_TASKS, UPDATE_TASKS } from '../constants/ActionsTypes';
import { 
    createTasks,
    getTasks,
    updateTasks
} from '../apis/Tasks'

function* createTasksRequest({payload}) {    
    try {
        const tasks = yield call(createTasks, payload);
        yield put(createTasksSuccess(tasks) );
    } catch (error) {
    }
}

function* getTasksRequest({payload}) {    
    try {
        const tasksList = yield call(getTasks, payload);
        yield put(getTasksSuccess(tasksList) );
    } catch (error) {
    }
}

function* updateTasksRequest({payload}) {    
    try {
        const tasks = yield call(updateTasks, payload);        
        yield put(updateTasksSuccess(tasks) );
    } catch (error) {
        console.log(error);
    }
}

export function* createTasksSaga() {
    yield takeEvery(CREATE_TASKS, createTasksRequest);
}

export function* getTasksSaga() {
    yield takeEvery(GET_TASKS, getTasksRequest);
}

export function* updateTasksSaga() {
    yield takeEvery(UPDATE_TASKS, updateTasksRequest);
}

export default function* rootSaga() {
    yield all([
        fork(createTasksSaga),        
        fork(getTasksSaga),        
        fork(updateTasksSaga),        

    ]);
}