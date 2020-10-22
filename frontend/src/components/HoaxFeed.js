import React, { useState, useEffect } from 'react';
import { getHoaxes, getNewHoaxCount, getNewHoaxes, getOldHoaxes } from '../api/ApiCall'; 
import { useTranslation } from 'react-i18next';
import HoaxView from './HoaxView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

const HoaxFeed = props => {
    const [hoaxPage, setHoaxPage]=useState({content:[], last:true, number:0});
    const [newHoaxCount, setNewHoaxCount]=useState(0);
    const { t }=useTranslation();
    const { username }=useParams();
    const path=username ? `/api/1.0/users/${username}/hoaxes?page=` : '/api/1.0/hoaxes?page=';
    const initialHoaxLoadProgress=useApiProgress('get',path);
    
    let lastHoaxId=0;
    let firstHoaxId=0;
    if(hoaxPage.content.length>0){
        firstHoaxId=hoaxPage.content[0].id;
        const lastHoaxIndex=hoaxPage.content.length-1;
        lastHoaxId=hoaxPage.content[lastHoaxIndex].id;
    }
    const oldHoaxPath=username ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}` : `/api/1.0/hoaxes/${lastHoaxId}`;
    const loadOldHoaxesProgress=useApiProgress('get',oldHoaxPath, true);
    const newHoaxesPath=username ? `/api/1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after` : `/api/1.0/hoaxes/${firstHoaxId}?direction=after`;
    const loadNewHoaxesProgress=useApiProgress('get', newHoaxesPath, true);

    useEffect(()=>{
        const getCount=async () =>{
            const response=await getNewHoaxCount(firstHoaxId, username);
            setNewHoaxCount(response.data.count);
        }
        let looper= setInterval(getCount,3000);
        return function cleanup(){
            clearInterval(looper);
        }
    },[firstHoaxId, username])

    useEffect(() => {
        const loadHoaxes=async page=>{
            try{
                const response=await getHoaxes(username, page);
                setHoaxPage(previousHoaxPage=>({
                    ...response.data,
                    content:[...previousHoaxPage.content,...response.data.content]
                }) );
            } catch(error){ }
        }
        loadHoaxes();
    }, [username]);


    const loadOldHoaxes=async ()=>{
        try{
            const response=await getOldHoaxes(lastHoaxId, username);
            setHoaxPage(previousHoaxPage=>({
                ...response.data,
                content:[...previousHoaxPage.content,...response.data.content]
            }) );
        } catch(error){ }
    }
    
    const loadNewHoaxes=async ()=>{
        try{
            const response=await getNewHoaxes(firstHoaxId, username);
            setHoaxPage(previousHoaxPage=>({
                ...previousHoaxPage,
                content:[...response.data, ...previousHoaxPage.content]
            }) );
            setNewHoaxCount(0);
        } catch(error){ }
    }

    const { content, last }=hoaxPage;

    if(content.length===0){
        return <div className="alert alert-secondary text-center">{initialHoaxLoadProgress ? <Spinner /> : t("There are no hoaxes")}</div>
    }

    return (
        <div>
            {
                newHoaxCount>0 &&
                <div className="alert alert-secondary text-center my-1" onClick={loadNewHoaxesProgress ? ()=>{} : loadNewHoaxes} style={{cursor: loadOldHoaxesProgress ? 'not-allowed' : 'pointer'}}>
                    { loadNewHoaxesProgress ? <Spinner /> :  t("There are new hoaxes") }
                </div>
            }
            {content.map(hoax=>{
                return <HoaxView key={hoax.id} hoax={hoax} />
            })}
            {!last && <div className="alert alert-secondary text-center" onClick={loadOldHoaxesProgress ? ()=>{} : loadOldHoaxes} style={{cursor: loadOldHoaxesProgress ? 'not-allowed' : 'pointer'}}>
                { loadOldHoaxesProgress ? <Spinner /> :  t("Load old hoaxes") }
            </div>} 
        </div>
    );
};

export default HoaxFeed;