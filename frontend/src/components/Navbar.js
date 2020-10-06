import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hoaxify.png';
import { withTranslation } from 'react-i18next';

class Navbar extends Component {
    render() {
        const { t }=this.props;
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img src={logo} alt="navbar-logo" width="50" height="30" />
                        Hoaxify
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">{t("Login")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">{t("Sign Up")}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
export default withTranslation()(Navbar);