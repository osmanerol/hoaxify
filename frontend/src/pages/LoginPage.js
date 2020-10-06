import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import { login } from '../api/ApiCall';

class LoginPage extends Component {
    state={
        username:null,
        password:null
    }

    onChange=event=>{
        event.preventDefault();
        const { name, value }=event.target;
        this.setState({
            [name]:value
        });
    }

    onClick=async event=>{
        event.preventDefault();
        const { username, password }=this.state;
        const creds={
            username,
            password
        }
        console.log(creds);
        try{
            await login(creds)
        } catch(error){

        }
    }

    render() {
        const { t }=this.props;
        return (
            <div className="row mt-3">
                <form className="col-md-6 col-12 mx-auto">
                    <h2 className="text-center">{t("Login")}</h2>
                    <Input label={t("Username")} type="text" name="username" onChange={this.onChange} />
                    <Input label={t("Password")} type="password" name="password" onChange={this.onChange} />
                    <button className="btn btn-secondary btn-block" onClick={this.onClick}>
                        {t("Login")}
                    </button>
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

export default LoginPageWithTranslation;