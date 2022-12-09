import axios from "axios"
import { DELETE_USER, FEACH_USER_FAILURE, FEACH_USER_REQUEST, FEACH_USER_SUCCUSS } from "./userType"

export const feachUserRequest = () => {
    return {
        type : FEACH_USER_REQUEST
    }
}

export const feachUserSuccess = user => {
    return {
        type : FEACH_USER_SUCCUSS,
        payload : user
    }
}

export const feachUserFailure = error => {
    return {
        type : FEACH_USER_FAILURE,
        payload : error
    }
}

export const deleteUser = index => {
    return {
        type : DELETE_USER,
        payload : index
    }
}

export const feachUser = () => {
    return function( dispatch, getState ) {
        const users = getState().users;

        if( users.loading ) { return; }

        const pageToken = users.pageToken;
        dispatch( feachUserRequest() )
        axios.get('https://message-list.appspot.com/messages' + ( pageToken ? '?pageToken=' + pageToken : '' ))
            .then( response => {
                console.log('USERDATA', response.data)
                dispatch( feachUserSuccess( response.data ) )
            })
            .catch( error => {
                dispatch( feachUserFailure( error ) )
            })
    }
}