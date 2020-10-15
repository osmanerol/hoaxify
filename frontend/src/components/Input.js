import React from 'react';

const Input = props => {
    const { label, type, name, onChange, error, defaultValue }=props;
    const className=error ? "form-control is-invalid" : "form-control";
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} className={className} onChange={onChange} defaultValue={defaultValue} />
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    );
};

export default Input;