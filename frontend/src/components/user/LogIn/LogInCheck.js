import React from 'react';

const LogInCheck = ({ errorMessage }) => {    
    return (
        <div>
            <div className='text-small-size  mb-4'>{errorMessage}</div>
        </div>
    );
};

export default LogInCheck;