import { all } from 'redux-saga/effects';
import usersSaga from './Users';
import tasksSaga from './Tasks';

export default function* rootSaga(getState) {
    yield all([
        usersSaga(),
        tasksSaga()
    ])
}