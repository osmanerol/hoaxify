import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ProifleImageWithDefault from './ProifleImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { updateUser, deleteUser } from '../api/ApiCall';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import { logoutSuccess, updateSuccess } from '../redux/AuthAction';
import Modal from './Modal'; 

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
    const [newImage, setNewImage]=useState();
    const [validationErrors, setValidationErrors]=useState({});
    const [modalVisible, setModalVisible]=useState(false);
    const dispatch=useDispatch();
    const history=useHistory();

    useEffect(()=>{
        setEditable(pathUsername===loggedInUsername)
    },[pathUsername, loggedInUsername])

    useEffect(()=>{
        setValidationErrors(previousErrors=>({...previousErrors,displayName:undefined}));
    },[updateDisplayName])

    useEffect(()=>{
        setValidationErrors(previousErrors=>({...previousErrors,image:undefined}));
    },[newImage])

    useEffect(()=>{
        setUser(props.user);
    },[props.user])

    useEffect(()=>{
        if(!inEditMode){
            setUpdateDisplayName(undefined);
            setNewImage(undefined);
        }
        else{
            setUpdateDisplayName(displayName);
        }
    },[inEditMode,displayName])

    const onChangeFile=(event)=>{
        if(!(event.target.files.length<1)){
            const file=event.target.files[0];
            const fileReader=new FileReader();
            fileReader.onloadend=()=>{
                setNewImage(fileReader.result);
            }
            fileReader.readAsDataURL(file); 
        }
    }

    const onClickSave=async event=>{
        event.preventDefault();
        let image;
        if(newImage){
            image=newImage.split(',')[1];
        }
        const body={
            displayName:updateDisplayName,
            image
        }
        try{
            const response=await updateUser(username,body);
            setUser(response.data);
            setInEditMode(false);
            dispatch(updateSuccess(response.data))
        } catch(error){
            if(error.response.data.validationErrors){
                setValidationErrors(error.response.data.validationErrors);
            }
        }
    }

    const { displayName: displayNameError, image: imageError }=validationErrors;

    const pendingApiCallDeleteUser=useApiProgress('delete',`/api/1.0/users/${username}`, true);

    const onClickDeleteUser=async ()=>{
        await deleteUser(username);
        setModalVisible(false);
        dispatch(logoutSuccess());
        history.push("/");
    }

    const onClickCancel=()=>{
        setModalVisible(false);
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                <ProifleImageWithDefault image={image} tempimage={newImage} className="rounded-circle shadow" width="100" height="100" /> 
            </div>
            <div className="card-body">
                {
                    !inEditMode && 
                    <div>
                        <h4>{displayName} <small>@{username}</small></h4> 
                        {
                            editable && (
                                <>
                                    <button className="btn btn-success d-inline-flex" onClick={()=>setInEditMode(true)}><span className="material-icons">create</span>{t("Edit")}</button>
                                    <div className="pt-2">
                                        <button className="btn btn-danger d-inline-flex" onClick={()=>setModalVisible(true)}><span className="material-icons">directions_run</span>{t("Delete My Account")}</button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                }
                {
                    inEditMode &&
                    <form className="col-md-12 mx-auto">
                        <Input className="mb-0" label={t("Change Display Name")} type="text" defaultValue={displayName} onChange={event=>setUpdateDisplayName(event.target.value)} error={displayNameError} />
                        <Input type="file" onChange={onChangeFile} error={imageError} />   
                        <div>
                            <ButtonWithProgress className="btn btn-primary d-inline-flex mr-2" onClick={onClickSave} displayName={pendingApiCall} pendingApiCall={pendingApiCall} label={<> <i className="material-icons mr-1">save</i>{t("Save")} </>} />
                            <button className="btn btn-light d-inline-flex" onClick={()=>setInEditMode(false)} disabled={pendingApiCall }><span className="material-icons mr-1">close</span>{t("Cancel")}</button>
                        </div>
                    </form>
                }
            </div>
            <Modal visible={modalVisible} title={t("Delete My Account")} okButton={t("Delete My Account")} onClickCancel={onClickCancel} onClickOk={onClickDeleteUser} pendingApiCall={pendingApiCallDeleteUser} message={t("Are you sure to delete your account ?")} />
        </div>
    );
};

export default ProfileCard;