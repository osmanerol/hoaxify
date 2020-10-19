import React, { useState, useEffect } from 'react';
import ProfileImageWithDefault from './ProifleImageWithDefault';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { postHoax } from '../api/ApiCall';
import ButtonWithProgress from './ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';

const HoaxSubmit = props => {
    const { image } = useSelector(store =>({image:store.image}));
    const [focused, setFocused]=useState(false);
    const [hoax, setHoax]=useState('');
    const [errors, setErrors]=useState({});
    const { t }=useTranslation();
    const pendingApiCall=useApiProgress('post',"/api/1.0/hoaxes");

    useEffect(() => {
        if(!focused){
            setHoax('');
            setErrors({});
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
    }, [hoax])

    const onClickHoaxify=async ()=>{
        const body={
            content:hoax
        }
        try{
            await postHoax(body);
            setFocused(false);
        } catch(error){
            if(error.response.data.validationErrors){ 
                setErrors(error.response.data.validationErrors);
            }
        }
    }

    let textAreaClass="form-control";
    if(errors.content){
        textAreaClass+=" is-invalid";
    }

    return (
        <div className="card p-1 flex-row">
            <ProfileImageWithDefault image={image} className="rounded-circle mr-1" width="32" height="32" />
            <div className="flex-fill">
                <textarea name="hoax" className={textAreaClass} rows={focused ? "3" : "1"} onFocus={()=>setFocused(true)} onChange={event=>setHoax(event.target.value)} value={hoax} />
                <div className="invalid-feedback">
                    {errors.content}
                </div>
                {
                    focused && 
                    <div className="text-right mt-1">
                        <ButtonWithProgress className="btn btn-info" label={"Hoaxify"} onClick={onClickHoaxify} pendingApiCall={pendingApiCall} disabled={pendingApiCall} />
                        <button className="btn btn-light d-inline-flex ml-2" onClick={()=>setFocused(false)}  disabled={pendingApiCall}  ><span className="material-icons mr-1">close</span>{t("Cancel")}</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default HoaxSubmit;