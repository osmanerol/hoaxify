import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hoaxify.png';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/AuthAction'
import ProifleImageWithDefault from './ProifleImageWithDefault';

const Navbar=props=>{
    const { t }=useTranslation();
    const dispatch=useDispatch();
    const { username, isLoggedIn, displayName, image }=useSelector(store=>({
        username:store.username,
        isLoggedIn:store.isLoggedIn,
        displayName:store.displayName,
        image:store.image
    }));

    const onLogoutSuccess=()=>{
        dispatch(logoutSuccess());
    }

    let links=(
        <ul className="navbar-nav ml-auto">
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
            <ul className="navbar-nav ml-auto">
                <li className="dropdown">
                    <div className="d-flex" style={{cursor:'pointer'}}>
                        <ProifleImageWithDefault image={image} width="32" height="32" className="rounded-circle m-auto" />
                        <span className="nav-link  dropdown-toggle" data-toggle="dropdown">{displayName}</span>
                        <div className="dropdown-menu p-1 shadow">
                            <Link to={`/user/${username}`} className="dropdown-item d-flex p-2"><span className="material-icons text-info mr-2">person</span>{t("Profile")}</Link>
                            <span className="dropdown-item d-flex p-2" style={{cursor:'pointer'}} onClick={onLogoutSuccess}><span className="material-icons text-danger mr-2">exit_to_app</span>{t("Logout")}</span>
                        </div>
                    </div>
                </li>
            </ul>
        );
    }
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="navbar-logo" width="50" height="30" />
                    Hoaxify
                </Link>
                {links}
            </div>
        </nav>
    )
}

export default Navbar;