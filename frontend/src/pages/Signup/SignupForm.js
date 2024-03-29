import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate('/loginForm');
    }
    return (
        <div className='signup-image'>
            <div className="signup-box">
                <form onSubmit={handleSignup}>
                    <h1>회원가입</h1>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder='이메일 입력'
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder='비밀번호 입력'
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder='비밀번호 확인'
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="number"
                            placeholder='전화번호 입력'
                        />
                    </div>
                <button className='btn'>회원가입</button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;