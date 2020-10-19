import React, { useState, useEffect } from 'react';
import { getHoaxes } from '../api/ApiCall'; 
import { useTranslation } from 'react-i18next';
import HoaxView from './HoaxView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';

const HoaxFeed = props => {
    const [hoaxPage, setHoaxPage]=useState({content:[], last:true, number:0});
    const { t }=useTranslation();
    const pendingApiCall=useApiProgress('get','/api/1.0/hoaxes');

    const loadHoaxes=async page=>{
        try{
            const response=await getHoaxes(page);
            setHoaxPage(previousHoaxPage=>({
                ...response.data,
                content:[...previousHoaxPage.content,...response.data.content]
            }) );
        } catch(error){ }
    }

    useEffect(() => {
        loadHoaxes();
    }, []);

    const { content, last, number }=hoaxPage;

    if(content.length===0){
        return <div className="alert alert-secondary text-center">{pendingApiCall ? <Spinner /> : t("There are no hoaxes")}</div>
    }

    return (
        <div>
            {content.map(hoax=>{
                return <HoaxView key={hoax.id} hoax={hoax} />
            })}
            {!last && <div className="alert alert-secondary text-center" onClick={pendingApiCall ? ()=>{} : ()=>loadHoaxes(number+1)} style={{cursor: pendingApiCall ? 'not-allowed' : 'pointer'}}>
                { pendingApiCall ? <Spinner /> :  t("Load old hoaxes") }
            </div>} 
        </div>
    );
};

export default HoaxFeed;