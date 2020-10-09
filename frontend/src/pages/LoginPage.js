import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../redux/AuthAction';

const LoginPage=props=> {
    const [username, setUsername]=useState();
    const [password, setPassword]=useState();
    const [error, setError]=useState();
    const dispatch=useDispatch();
    //  [] icindekilere etki oldugunda tetiklenecek fonksiyon
    useEffect(()=>{
        setError(undefined);
    },[username,password])

    const onClick=async event=>{
        event.preventDefault();
        const { history }=props;
        const { push }=history;
        const creds={
            username,
            password
        }
        setError(undefined);
        try{
            await dispatch(loginHandler(creds));
            push('/');
        } catch(apiError){
            setError(apiError.response.data.message);
        }
    }

    const { t }=useTranslation();
    const { pendingApiCall }=useApiProgress('/api/1.0/auth');
    const buttonEnabled=username && password;
    return (
        <div className="row mt-3">
            <form className="col-md-6 col-12 mx-auto">
                <h2 className="text-center">{t("Login")}</h2>
                <Input label={t("Username")} type="text" name="username" onChange={event=>setUsername(event.target.value)} />
                <Input label={t("Password")} type="password" name="password" onChange={event=>setPassword(event.target.value)} />
                {
                    error && 
                    <div className="alert alert-danger">
                        {error}
                    </div>
                }
                <ButtonWithProgress onClick={onClick} pendingApiCall={pendingApiCall} disabled={!buttonEnabled || pendingApiCall} label={t("Login")} />
                <div className="text-center mt-2">
                    <p className="muted mb-1">{t("Don't you have an account ?")}</p>
                    <Link to="/signup">{t("Sign Up")}</Link>
                </div>
            </form>
        </div>
    );
}


export default LoginPage;