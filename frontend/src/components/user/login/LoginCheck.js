import React from 'react';

const LoginCheck = ({ errorMessage }) => {    
    return (
        <div>
            <div className='text-small-size text-red-500 mb-4'>{errorMessage}</div>
        </div>
    );
};

export default LoginCheck;