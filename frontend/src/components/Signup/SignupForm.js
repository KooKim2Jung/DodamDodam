import React from 'react';

const SignupForm = ({welcomeUser, setWelcomeUser}) => {
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
                type="email"
                name='email'
                value={welcomeUser.email}
                placeholder='이메일'
                onChange={submitWelcomeUser}
            />
            <input className='input-box'
                type="password"
                name='password'
                value={welcomeUser.password}
                placeholder='비밀번호'
                onChange={submitWelcomeUser}
            />
            <input className='input-box'
                type="password"
                name='passwordCheck'
                value={welcomeUser.passwordCheck}
                placeholder='비밀번호 확인'
                onChange={submitWelcomeUser}
            />
        </div>
    );
};

export default SignupForm;