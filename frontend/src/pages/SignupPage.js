import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import { connect } from 'react-redux';
import { signupHandler } from '../redux/AuthAction';

class SignupPage extends Component {
    state={
        username:null,
        displayName:null,
        password:null,
        passwordConfirm:null,
        errors:{},
    }
    
    onChange=event=>{
        event.preventDefault();
        const { t }=this.props;
        const { name, value }=event.target;
        const { password, passwordConfirm }=this.state;
        const errors={...this.state.errors};
        errors[name]=undefined;
        if(name==='password' || name==='passwordConfirm'){
            if(name==='password' && value!==passwordConfirm){
                errors.passwordConfirm=t("password missmatch");
            }
            else if(name==='passwordConfirm' && value!==password){
                errors.passwordConfirm=t("password missmatch");
            }
            else{
                errors.passwordConfirm=undefined;
            }
        }
        this.setState({
            [name]:value,
            errors
        });
    }

    onClick=async event=>{
        event.preventDefault();
        const { username, displayName, password }=this.state;
        const { history, signupHandler }=this.props;
        const { push }=history;
        const body={
            username,
            displayName,
            password
        }
        try{
            await signupHandler(body);
            push('/');
        } catch(error){
            if(error.response.data.validationErrors){
                this.setState({
                    errors:error.response.data.validationErrors
                })
            }
        }
    }

    render() {
        const { pendingApiCall }=this.props;
        const { errors }=this.state;
        const { username, displayName, password, passwordConfirm }=errors;
        const { t }=this.props;
        return (
            <div className="row mt-3">
                <form className="col-md-6 mx-auto">
                    <h2 className="text-center">{t("Sign Up")}</h2>
                    <Input label={t("Username")} type="text" name="username" onChange={this.onChange} error={username} />
                    <Input label={t("Display Name")} type="text" name="displayName" onChange={this.onChange} error={displayName} />
                    <Input label={t("Password")} type="password" name="password" onChange={this.onChange} error={password} />
                    <Input label={t("Password Confirm")} type="password" name="passwordConfirm" onChange={this.onChange} error={passwordConfirm} />
                    <ButtonWithProgress onClick={this.onClick} disabled={pendingApiCall || passwordConfirm!==undefined}pendingApiCall={pendingApiCall} label={t("Sign Up")} />
                    <div className="text-center mt-2">
                        <p className="muted mb-1">{t("Do you have an account ?")}</p>
                        <Link to="/login">{t("Login")}</Link>
                    </div>
                </form>
            </div>
        );
    }
}

const SignupPageWithTranslation=withTranslation()(SignupPage);
const SignupPageWithApiProgressForSignupPage=withApiProgress(SignupPageWithTranslation, "/api/1.0/users");
const SignupPageWithApiProgressForAuthRequest=withApiProgress(SignupPageWithApiProgressForSignupPage, "/api/1.0/auth");

const mapDispatchToProps={
    signupHandler
}

export default connect(null,mapDispatchToProps)(SignupPageWithApiProgressForAuthRequest);