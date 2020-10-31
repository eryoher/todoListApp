
import { CREATE_TASKS, CREATE_TASKS_SUCCESS, GET_TASKS, GET_TASKS_SUCCESS, UPDATE_TASKS, UPDATE_TASKS_SUCCESS } from '../constants/ActionsTypes';

const initialState = {
    listTasks: [],
    updateTasksList: [],
    newTasks: null,
    userUpdated: null,
    userDeleted: null,
    updateUsersList: null
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return { ...state, updateTasksList: null }
        case GET_TASKS_SUCCESS:
            return { ...state, listTasks: action.payload.data }
        case CREATE_TASKS:
            return { ...state, newTasks: null }
        case CREATE_TASKS_SUCCESS:
            return { ...state, newTasks: action.payload }
        case UPDATE_TASKS:
            return { ...state, tasksUpdated:null, newTasks:null }
        case UPDATE_TASKS_SUCCESS:
            const tasksUpdated = action.payload.data;
            const updateTasks = {
                ...state,
                updateTasksList: [
                    ...state.listTasks,
                ],
                tasksUpdated
            }                     

            updateTasks.updateTasksList.forEach(tasks => {
                if(tasks.id  === tasksUpdated.id ){
                    tasks.description = tasksUpdated.description                    
                    tasks.state = tasksUpdated.state
                }
            });
            
            return updateTasks;                 
        default:
            return state
    }
}

export default rootReducer
