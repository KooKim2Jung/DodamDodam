import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../Service/Api';
import SignUpForm from '../../../components/user/SignUp/SignUpForm';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')    

    const handleLogIn = () => {
        navigate('/LogInPage');
    }

    const submitSignUp  = async (data) => {
        try {
            const response = await api.post('/v1/auth/join', {
                email: data.email,
                password: data.password,
                phone_number: data.phoneNumber
            });
            alert(response.data.message);
            handleLogIn();
        } catch (error) {
            console.log("회원가입 요청 오류", error);;
            setErrorMessage(error.response.data.detail);
        }
    };

    return (
        <div className='relative flex justify-center items-center mt-[120px] mb-[25px] 
        w-[560px] h-[680px] rounded-[50px] shadow-[6px_4px_10px_#a5996e]'>
            <img src='/images/dodam_signup.png' className='w-[440px] h-[600px]'/>
            <div className='absolute mt-40 w-[360px] z-10'>
                <h1 className='text-basic-size'>회원가입</h1>
                <SignUpForm onSubmit={submitSignUp} errorMessage={errorMessage}/>
            </div>
        </div>
    );
};

export default SignUpPage;