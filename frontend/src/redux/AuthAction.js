import * as ACTIONS from './Constansts';
import { login, signup, logout } from '../api/ApiCall';

export const logoutSuccess=()=>{
    return async dispatch=>{
        try{
            await logout();
        }catch(err){}
        dispatch({
            type:ACTIONS.LOGOUT_SUCCESS
        })
    }
}

export const loginSuccess=(authState)=>{
    return dispatch=>{
        dispatch({
            type:ACTIONS.LOGIN_SUCCESS,
            payload:authState
        })
    }
}

export const updateSuccess=({displayName, image})=>{
    return dispatch=>{
        dispatch({
            type:ACTIONS.UPDATE_SUCCESS,
            payload:{ displayName, image}
        })
    }
}

export const loginHandler=creds=>{
    return async dispatch=>{
        const response=await login(creds);
        const authState={
            ...response.data.user,
            password:creds.password,
            token:response.data.token
        }
        dispatch(loginSuccess(authState));
        return response;
    }
}

export const signupHandler=body=>{
    return async dispatch=>{
        const response=await signup(body);
        dispatch(loginHandler(body));
        return response;
    }
}