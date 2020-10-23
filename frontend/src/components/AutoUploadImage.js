import React from 'react';
import '../css/AutoUploadImage.css';

const AutoUploadImage = props => {
    const { image, uploading }=props;
    return (
        <div className="upload-container">
            <img src={image} className="img-thumbnail" alt="hoax-attachment" />
            <div className="overlay" style={{opacity: uploading ? 1 : 0}}>
                <div className="d-flex justify-content-center p-2 h-100">
                    <div className="spinner-border text-light m-auto">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoUploadImage;