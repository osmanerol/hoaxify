import React from 'react';

const Input = props => {
    const { label, type, name, onChange, error, defaultValue }=props;
    let className="form-control";
    if(type==="file"){
        className+="-file";
    }
    if(error!==undefined){
        className+=" is-invalid";
    }
    return (
        <div className="form-group">
            {
                label && 
                <label htmlFor={name}>{label}</label>
            }
            <input type={type} name={name} className={className} onChange={onChange} defaultValue={defaultValue} />
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    );
};

export default Input;