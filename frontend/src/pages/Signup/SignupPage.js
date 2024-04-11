import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate('/loginPage');
    }
    return (
        <div className='flex justify-center items-center bg-signup-image bg-center bg-no-repeat mt-[120px] mb-[25px] 
        w-[500px] h-[550px] rounded-[20px] shadow-[6px_4px_10px_#a5996e]'>
            <div className='mt-[155px]'>
                <form onSubmit={handleSignup}>
                    <h1 className='text-basic-size'>회원가입</h1>
                    <div>
                        <input className='input-box'
                            type="email"
                            placeholder='이메일 입력'
                        />
                    </div>
                    <div>
                        <input className='input-box'
                            type="password"
                            placeholder='비밀번호 입력'
                        />
                    </div>
                    <div>
                        <input className='input-box'
                            type="password"
                            placeholder='비밀번호 확인'
                        />
                    </div>
                    <div>
                        <input className='input-box'
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