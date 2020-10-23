import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImageWithDefault from './ProifleImageWithDefault';

const UserListItem = props => {
    const { user }=props;
    const { username, displayName, image }=user;

    return (
        <Link to={`/user/${username}`} className="list-group-item list-group-item-action" >
            <ProfileImageWithDefault image={image} className="rounded-circle" width="32" height="32" />
            <span className="pl-2">{displayName} <small>@{username}</small></span>
        </Link>
    );
};


export default UserListItem;