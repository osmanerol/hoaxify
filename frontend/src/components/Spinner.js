import React from 'react';

const Spinner = () => {
    return (
        <div className="d-flex justify-content-center p-2">
            <div className="spinner-border text-black-50">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;