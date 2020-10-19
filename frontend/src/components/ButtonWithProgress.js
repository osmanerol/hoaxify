import React from 'react';

const ButtonWithProgress= props => {
    const { onClick, disabled, pendingApiCall, label, className }=props;
    return (
        <button className={className || "btn btn-secondary btn-block" } onClick={onClick} disabled={disabled}>
            {pendingApiCall && <span className="spinner-border spinner-border-sm my-auto mr-1" role="status" aria-hidden="true"></span> } 
            {label}    
        </button>
    );
};

export default ButtonWithProgress;