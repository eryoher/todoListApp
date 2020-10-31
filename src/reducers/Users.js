
import {
    CREATE_USER, CREATE_USER_SUCCESS, DELETE_USER, DELETE_USER_SUCCESS,
    GET_ALL_USERS,
    GET_ALL_USERS_SUCCESS, UPDATE_USER, UPDATE_USER_SUCCESS
} from '../constants/ActionsTypes';

const initialState = {
    listUsers: null,
    newUser:null,
    userUpdated:null,
    userDeleted:null,
    updateUsersList:null
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return { ...state, listUsers: null, updateUsersList:null }
        case GET_ALL_USERS_SUCCESS:
            return { ...state, listUsers: action.payload }
        case CREATE_USER:
            return {...state, newUser:null}
        case CREATE_USER_SUCCESS:
            state.listUsers.data.push(action.payload)
            return { ...state, newUser:action.payload }
        case UPDATE_USER:
            return { ...state, userUpdated:null }
        case UPDATE_USER_SUCCESS:
            const userUpdated = action.payload;
            const updateUsers = {
                ...state,
                updateUsersList: {
                    ...state.listUsers,
                },
                userUpdated
            }                     
            
            updateUsers.updateUsersList.data.forEach(user => {
                if(user.id  === userUpdated.id ){
                    user.name= userUpdated.name
                    user.lastname = userUpdated.lastname
                    user.email = userUpdated.email
                }
            });
            
            return updateUsers;          
            
        case DELETE_USER:
            return { ...state, userDeleted:null }
        case DELETE_USER_SUCCESS:
            return {...state, userDeleted: action.payload}
        default:
            return state
    }
}

export default rootReducer
