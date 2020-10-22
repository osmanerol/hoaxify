import React from 'react';
import ProfileImageWithDefault from './ProifleImageWithDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';

const HoaxView = props => {
    const { hoax }=props;
    const { content, user, timestamp }=hoax;
    const { username, displayName, image }=user;
    const { i18n }=useTranslation();
    const formatted=format(timestamp,i18n.language);
    return (
        <div className="card p-1">
            <div className="d-flex">
                <ProfileImageWithDefault image={image} className="rounded-circle m-1" width="32" height="32" />
                <Link to={`/user/${username}`} className="flex-fill m-auto pl-2 text-dark">
                    <h6 className="d-inline">{displayName} <small className="text-muted">@{username}</small></h6>
                    <span className="ml-2">- {formatted}</span>
                </Link>
            </div>
            <div className="pl-5">
                {content}
            </div>
        </div>
    );
};

export default HoaxView;