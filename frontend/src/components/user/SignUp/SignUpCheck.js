import React from 'react';

const SignUpCheck = ({ errorMessage }) => {
    return (
        <div>
            <div className='text-small-size mt-2 mb-7 whitespace-pre-line'>{errorMessage}</div>
        </div>
    );
};

export default SignUpCheck;