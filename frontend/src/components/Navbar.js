import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hoaxify.png';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/AuthAction'

const Navbar=props=>{
    const { t }=useTranslation();
    const dispatch=useDispatch();
    const { username }=useSelector(store=>({username:store.username}));
    const { isLoggedIn }=useSelector(store=>({isLoggedIn:store.isLoggedIn}));

    const onLogoutSuccess=()=>{
        dispatch(logoutSuccess());
    }

    let links=(
        <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
                <Link to="/login" className="nav-link">{t("Login")}</Link>
            </li>
            <li className="nav-item">
                <Link to="/signup" className="nav-link">{t("Sign Up")}</Link>
            </li>
        </ul>
    );
    if(isLoggedIn){
        links=(
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/user/${username}`} className="nav-link">{username}</Link>
                </li>
                <li className="nav-item" onClick={onLogoutSuccess}>
                    <span className="nav-link" style={{cursor:'pointer'}}>{t("Logout")}</span>
                </li>
            </ul>
        );
    }
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
                    {links}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;