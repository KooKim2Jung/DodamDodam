import React from 'react';

const LoginCheck = ({ errorMessage }) => {    
    return (
        <div>
            <div className='text-small-size  mb-4'>{errorMessage}</div>
        </div>
    );
};

export default LoginCheck;