import React from 'react';
import defaultPicture from '../assets/profile.png';

const ProifleImageWithDefault = props => {
    const { image }=props;
    let imageSource=defaultPicture;
    if(image){
        imageSource=image;
    }

    return (
        <img src={imageSource} {...props}  alt='profile' /> 
    );
};

export default ProifleImageWithDefault;