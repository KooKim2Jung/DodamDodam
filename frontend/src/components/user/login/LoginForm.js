import React from 'react';

const LoginForm = ({ user, setUser }) => {
    const submitUser = (e) => {
        const { name, value } = e.target;
        setUser(user => ({
            ...user,
            [name]: value
        }))
    }

    return (
        <div>
            <input className='input-box'
                type="text"
                name='email'
                value={user.email}
                placeholder='이메일'
                onChange={submitUser}
            />
            <input className='input-box'
                type="password"
                name='password'
                value={user.password}
                placeholder='비밀번호'
                onChange={submitUser}
            />
        </div>
    );
};

export default LoginForm;