import React from 'react';
import defaultPicture from '../assets/profile.png';

const ProifleImageWithDefault = props => {
    const { image, tempimage }=props;
    let imageSource=defaultPicture;
    if(image){
        imageSource='/images/'+image;
    }

    // event.target=img;
    return (
        <img src={tempimage || imageSource}  {...props} onError={event=>{event.target.src=defaultPicture}}  alt='profile' /> 
    );
};

export default ProifleImageWithDefault;