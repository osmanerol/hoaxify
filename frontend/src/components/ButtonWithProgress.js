import React from 'react';

const ButtonWithProgress= props => {
    const { onClick, disabled, pendingApiCall, label }=props;
    return (
        <button className="btn btn-secondary btn-block" onClick={onClick} disabled={disabled}>
            {pendingApiCall && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> } 
            <span> {label}</span>
        </button>
    );
};

export default ButtonWithProgress;