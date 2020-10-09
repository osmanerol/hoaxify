import React, { useState } from 'react';
import Input from '../components/Input';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { signupHandler } from '../redux/AuthAction';

const SignupPage=props=>{
    const [form, setForm]=useState({
        username:null,
        displayName:null,
        password:null,
        passwordConfirm:null,
    });
    const [errors, setErrors]=useState({});
    const dispatch=useDispatch();

    const onChange=event=>{
        event.preventDefault();
        const { name, value }=event.target;
        setForm(previousForm=>({ ...previousForm, [name]:value }));
        setErrors(previousError=>({...previousError, [name]:undefined}));
    }

    const onClick=async event=>{
        event.preventDefault();
        const { history }=props;
        const { push }=history;
        const { username, displayName, password }=form;
        const body={
            username,
            displayName,
            password
        }
        try{
            await dispatch(signupHandler(body));
            push('/');
        } catch(error){
            if(error.response.data.validationErrors){
                setErrors(error.response.data.validationErrors)
            }
        }
    }

    const { t }=useTranslation();
    const pendingApiCallSignUp=useApiProgress('/api/1.0/auth');
    const pendingApiCallLogin=useApiProgress('/api/1.0/users');
    const pendingApiCall=pendingApiCallSignUp || pendingApiCallLogin;
    const { username:usernameError, displayName:displayNameError, password:passwordError }=errors;
    let passwordConfirmError;
    if(form.password!==form.passwordConfirm){
        passwordConfirmError=t('password missmatch');
    }
    return (
        <div className="row mt-3">
            <form className="col-md-6 mx-auto">
                <h2 className="text-center">{t("Sign Up")}</h2>
                <Input label={t("Username")} type="text" name="username" onChange={onChange} error={usernameError} />
                <Input label={t("Display Name")} type="text" name="displayName" onChange={onChange} error={displayNameError} />
                <Input label={t("Password")} type="password" name="password" onChange={onChange} error={passwordError} />
                <Input label={t("Password Confirm")} type="password" name="passwordConfirm" onChange={onChange} error={passwordConfirmError} />
                <ButtonWithProgress onClick={onClick} disabled={pendingApiCall || passwordConfirmError!==undefined} pendingApiCall={pendingApiCall} label={t("Sign Up")} />
                <div className="text-center mt-2">
                    <p className="muted mb-1">{t("Do you have an account ?")}</p>
                    <Link to="/login">{t("Login")}</Link>
                </div>
            </form>
        </div>
    );
}

export default SignupPage;