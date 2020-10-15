import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProifleImageWithDefault from './ProifleImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { updateUser } from '../api/ApiCall';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

const ProfileCard = props => {
    const { username:loggedInUsername}=useSelector(store=>({username:store.username}));
    const [inEditMode, setInEditMode]=useState(false);
    const [user,setUser]=useState({});
    const [updateDisplayName, setUpdateDisplayName]=useState();
    const routeParams=useParams();
    const { username, displayName, image }=user;
    const pathUsername=routeParams.username;
    const { t }=useTranslation();
    const pendingApiCall=useApiProgress('put','/api/1.0/users/'+username);
    const [editable, setEditable]=useState(false);

    useEffect(()=>{
        setEditable(pathUsername===loggedInUsername)
    },[pathUsername, loggedInUsername])


    useEffect(()=>{
        setUser(props.user);
    },[props.user])

    useEffect(()=>{
        if(!inEditMode){
            setUpdateDisplayName(undefined);
        }
        else{
            setUpdateDisplayName(displayName);
        }
    },[inEditMode,displayName])

    const onClickSave=async ()=>{
        const body={
            displayName:updateDisplayName
        }
        try{
            const response=await updateUser(username,body);
            setUser(response.data);
            setInEditMode(false);
        } catch(error){

        }
    }

    return (
        <div className="card mt-2 text-center">
            <div className="card-header">
                <ProifleImageWithDefault image={image} className="rounded-circle shadow" width="100" height="100" /> 
            </div>
            <div className="card-body">
                {
                    !inEditMode && 
                    <div>
                        <h4>{displayName} <small>@{username}</small></h4> 
                        {
                            editable && 
                            <button className="btn btn-success d-inline-flex" onClick={()=>setInEditMode(true)}><span className="material-icons">create</span>{t("Edit")}</button>
                        }
                    </div>
                }
                {
                    inEditMode &&
                    <div>
                        <Input label={t("Change Display Name")} type="text" defaultValue={displayName} onChange={event=>setUpdateDisplayName(event.target.value)} />
                        <div>
                            <ButtonWithProgress className="btn btn-primary d-inline-flex mr-2" onClick={onClickSave} displayName={pendingApiCall} pendingApiCall={pendingApiCall} label={<> <i className="material-icons mr-1">save</i>{t("Save")} </>} />
                            <button className="btn btn-light d-inline-flex" onClick={()=>setInEditMode(false)} disabled={pendingApiCall }><span className="material-icons mr-1">close</span>{t("Cancel")}</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default ProfileCard;