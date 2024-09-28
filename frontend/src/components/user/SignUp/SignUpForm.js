import React from 'react';
import { useForm } from 'react-hook-form';

const SignUpForm = () => {

    return (
        <div>
            <input className='input-box'
                type="text"
                name='email'
                placeholder='이메일'
            />
            <input className='input-box'
                type="password"
                name='password'
                placeholder='비밀번호(8~16자 영문자, 특수문자 포함)'
            />
            <input className='input-box'
                type="number"
                name='phoneNumber'
                placeholder='전화번호(11자리, -제외)'
            />
        </div>
    );
};

export default SignUpForm;