import React, { useState } from 'react';
import ProfileImageWithDefault from './ProifleImageWithDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/ApiCall';
import Modal from './Modal';
import { useApiProgress } from '../shared/ApiProgress';

const HoaxView = props => {
    const loggedInUser=useSelector(store=>store.username);
    const [modalVisible, setModalVisible]=useState(false);
    const { hoax, onDeleteHoax }=props;
    const { content, user, timestamp, fileAttachment, id }=hoax;
    const { username, displayName, image }=user;
    const { i18n, t }=useTranslation();
    const formatted=format(timestamp,i18n.language);
    const ownByLoggedInUser=loggedInUser===username;

    const pendingApiCall=useApiProgress('delete',`/api/1.0/hoaxes/${id}`,true);

    const onClickDelete=async ()=>{
        await deleteHoax(id);
        onDeleteHoax(id);
    }

    const onClickCancel=()=>{
        setModalVisible(false);
    }

    return (
        <>
            <div className="card p-1">
                <div className="d-flex">
                    <ProfileImageWithDefault image={image} className="rounded-circle m-1" width="32" height="32" />
                    <Link to={`/user/${username}`} className="flex-fill m-auto pl-2 text-dark">
                        <h6 className="d-inline">{displayName} <small className="text-muted">@{username}</small></h6>
                        <span className="ml-2">- {formatted}</span>
                    </Link>
                    {
                        ownByLoggedInUser &&
                        <button className="btn btn-delete-link btn-sm" onClick={()=>setModalVisible(true)}>
                            <i className="material-icons">delete_outline</i>
                        </button>
                    }
                </div>
                <div className="pl-5">
                    {content}
                </div>
                {
                    fileAttachment && 
                    <div className="pl-5">
                        {
                            fileAttachment.fileType.startsWith("image") && <img src={"/images/attachments/"+fileAttachment.name} className="img-fluid" alt="content"/>
                        }
                        {
                            !fileAttachment.fileType.startsWith("image") && <strong>Hoax has unknown attachment.</strong>
                        }
                    </div>
                }
            </div>
            <Modal visible={modalVisible} title={t("Delete Hoax")} okButton={t("Delete Hoax")} onClickCancel={onClickCancel} onClickOk={onClickDelete} pendingApiCall={pendingApiCall} message={
                <div>
                    <strong className="d-block">{t("Are you sure to delete hoax ?")}</strong>
                    <span>{content}</span>
                </div>
            } />
        </>
    );
};

export default HoaxView;