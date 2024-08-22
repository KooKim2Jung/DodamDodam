import React from 'react';

const SignUpForm = ({welcomeUser, setWelcomeUser}) => {
    const submitWelcomeUser = (e) => {
        const { name, value } = e.target;
        setWelcomeUser(welcomeUser => ({
            ...welcomeUser,
            [name]: value
        }))
    }
    return (
        <div>
            <input className='input-box'
                type="text"
                name='email'
                value={welcomeUser.email}
                placeholder='이메일'
                onChange={submitWelcomeUser}
            />
            <input className='input-box'
                type="password"
                name='password'
                value={welcomeUser.password}
                placeholder='비밀번호 (8~16자 영문자, 특수문자 포함)'
                onChange={submitWelcomeUser}
            />
            <input className='input-box'
                type="number"
                name='phoneNumber'
                value={welcomeUser.phoneNumber}
                placeholder='전화번호 (11자리, -제외)'
                onChange={submitWelcomeUser}
            />
        </div>
    );
};

export default SignUpForm;