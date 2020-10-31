import { combineReducers } from "redux";
import UserReducer from './Users';
import TasksReducer from './Tasks';

const reducers = combineReducers({
    users: UserReducer,
    tasks: TasksReducer
});

const rootReducer = (state, action) => {
    return reducers(state, action);
};

export default rootReducer;
