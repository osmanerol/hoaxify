import * as ACTIONS from './Constansts';

const defaultState={
    isLoggedIn:false,
    username:undefined,
    displayName:undefined,
    image:undefined,
    password:undefined
}

const authReeducer=(state={...defaultState},action)=>{
    switch(action.type){
        case ACTIONS.LOGOUT_SUCCESS:
            return defaultState;
        case ACTIONS.LOGIN_SUCCESS:
            return {
                isLoggedIn:true,
                ...action.payload
            }
        default:
            return state;
    }
}

export default authReeducer;