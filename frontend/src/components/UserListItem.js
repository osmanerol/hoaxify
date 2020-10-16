import React from 'react';
import defaultPicture from '../assets/profile.png';
import { Link } from 'react-router-dom';

const UserListItem = props => {
    const { user }=props;
    const { username, displayName, image }=user;
    let imageSource=defaultPicture;
    if(image){
        imageSource='images/'+user.image    ;
    }
    return (
        <Link to={`/user/${username}`} className="list-group-item list-group-item-action" >
            <img src={imageSource} alt={`${username}-profile`} className="rounded-circle" width="32" height="32" /> 
            <span className="pl-2">{displayName} <small>@{username}</small></span>
        </Link>
    );
};


export default UserListItem;