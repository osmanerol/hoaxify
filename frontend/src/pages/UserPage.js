import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/ApiCall';
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import HoaxFeed from '../components/HoaxFeed';

const UserPage=props=> {
    const [user,setUser]=useState({});
    const { username }=useParams();
    const [notFound,setNotFound]=useState(false);
    const { t }=useTranslation();
    const pendingApiCall=useApiProgress('get', '/api/1.0/users/'+username,true);

    useEffect(()=>{
        setNotFound(false);
    },[user])

    useEffect(()=>{
        const loadUser=async ()=>{
            try{
                const response=await getUser(username);
                setUser(response.data);
            }catch(error){
                setNotFound(true);
            }
        }   
        loadUser(); 
    },[username]);

    if(notFound){
        return (
            <div className="alert alert-danger mt-2 text-center">
                <div>
                    <i className="material-icons">error </i>
                </div>
                {t("User not found")}
            </div>
        )
    }

    if(pendingApiCall || user.username !== username){
        return (
            <Spinner />
        )
    }

    return (
        <div className="row">
            <div className="col-md-6 mt-3">
                <ProfileCard user={user} />
            </div>
            <div className="col-md-6 mt-3">
                <HoaxFeed />
            </div>
        </div>
    );
}

export default UserPage;