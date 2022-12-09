import { DELETE_USER, FEACH_USER_FAILURE, FEACH_USER_REQUEST, FEACH_USER_SUCCUSS } from "./userType"

const initialState = {
    loading : false,
    users : [],
    error : '',
    pageToken : ''
}

const userReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case FEACH_USER_REQUEST : return {
            ...state,
            loading : true
        }
        case FEACH_USER_SUCCUSS : return {
            loading : false,
            users : [ ...state.users, ...action.payload.messages ],
            error : '',
            pageToken : action.payload.pageToken
        }
        case FEACH_USER_FAILURE : return {
            ...state,
            loading : false,
            error : action.payload
        }
        case DELETE_USER : return {
            ...state,
            users : state.users.filter( ( user, index ) => index != action.payload )
        }
        default : return state
    }
}

export default userReducer;