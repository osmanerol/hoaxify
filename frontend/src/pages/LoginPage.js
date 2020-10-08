import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import {  } from '../api/ApiCall';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress} from '../shared/ApiProgress';
import { connect } from 'react-redux';
import { loginHandler } from '../redux/AuthAction';

class LoginPage extends Component {
    state={
        username:null,
        password:null,
        error:null,
    }

    onChange=event=>{
        event.preventDefault();
        const { name, value }=event.target;
        this.setState({
            [name]:value,
            error:null
        });
    }

    onClick=async event=>{
        event.preventDefault();
        const { history }=this.props;
        const { push }=history;
        const { username, password }=this.state;
        const { loginHandler }=this.props;
        const creds={
            username,
            password
        }
        this.setState({
            error:null
        });
        try{
            await loginHandler(creds);
            push('/');
        } catch(apiError){
            this.setState({
                error:apiError.response.data.message
            });
        }
    }

    render() {
        const { t, pendingApiCall }=this.props;
        const { username, password,  error }=this.state;
        const buttonEnabled=username && password;
        return (
            <div className="row mt-3">
                <form className="col-md-6 col-12 mx-auto">
                    <h2 className="text-center">{t("Login")}</h2>
                    <Input label={t("Username")} type="text" name="username" onChange={this.onChange} />
                    <Input label={t("Password")} type="password" name="password" onChange={this.onChange} />
                    {
                        error && 
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    }
                    <ButtonWithProgress onClick={this.onClick} pendingApiCall={pendingApiCall} disabled={!buttonEnabled || pendingApiCall} label={t("Login")} />
                    <div className="text-center mt-2">
                        <p className="muted mb-1">{t("Don't you have an account ?")}</p>
                        <Link to="/signup">{t("Sign Up")}</Link>
                    </div>
                </form>
            </div>
        );
    }
}

const LoginPageWithTranslation=withTranslation()(LoginPage);
const LoginPageWithApiProgress=withApiProgress(LoginPageWithTranslation,"/api/1.0/auth");

const mapDispatchToProps={
    loginHandler
}

export default connect(null, mapDispatchToProps)(LoginPageWithApiProgress);