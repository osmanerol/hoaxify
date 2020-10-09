import * as ACTIONS from './Constansts';
import { login, signup } from '../api/ApiCall';

export const logoutSuccess=()=>{
    return dispatch=>{
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

export const loginHandler=creds=>{
    return async dispatch=>{
        const response=await login(creds);
        const authState={
            ...response.data,
            password:creds.password
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