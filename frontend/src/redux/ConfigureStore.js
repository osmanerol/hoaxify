import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import AuthReducer from './AuthReducer';
import SecureLS from 'secure-ls';
import { setAuthorizationHeader } from '../api/ApiCall';

const secureLs=new SecureLS();

const getStateFromStorage=()=>{
    //  sayfa refreshinde datalari tutma
    const hoaxAuth=secureLs.get('hoax-auth');    
    let stateInLocalStorage={
        isLoggedIn:false,
        username:undefined,
        displayName:undefined,
        image:undefined,
        password:undefined
    }
    if(hoaxAuth){
        return hoaxAuth;
    }
    return stateInLocalStorage;
}

const updateStateInStorage=newState=>{
    secureLs.set('hoax-auth',newState);
}

const configureStore=()=>{
    const initialState=getStateFromStorage();
    setAuthorizationHeader(initialState);
    const store=createStore(AuthReducer,initialState,composeWithDevTools(applyMiddleware(thunk)));
    //  store uzerindeki degisimlerden haberdar olabilmek icin
    store.subscribe(()=>{
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    })
    return store;
}
  
export default configureStore;