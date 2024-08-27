import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../Service/Api';
import SignUpForm from '../../../components/user/SignUp/SignUpForm';
import SignUpCheck from '../../../components/user/SignUp/SignUpCheck';

const SignUpPage = () => {
    const [welcomeUser, setWelcomeUser] = useState({
        email: '',
        password: '',
        phoneNumber: '',
    })
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('')    

    const resetForm = () => {
        setErrorMessage('');
    }

    const handleLogIn = () => {
        navigate('/LogInPage');
    }

    const submitSignUp  = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await api.post('/v1/auth/join', {
                    email: welcomeUser.email,
                    password: welcomeUser.password,
                    phone_number: welcomeUser.phoneNumber
                });
                alert(response.data.message);
                handleLogIn();
            } catch (signUpError) {
                console.log("회원가입 요청 오류", signUpError);
                const message = signUpError.response.data.detail;
                setErrorMessage(message);
            }
        }
    };

    const validateForm = () => {
        resetForm();

        let isValid = true;
        if (!welcomeUser.email) {
            setErrorMessage('이메일은 필수 입력 항목입니다.')
            isValid = false;
        } 
        if (welcomeUser.email && !welcomeUser.password) {
            setErrorMessage('비밀번호는 필수 입력 항목입니다.')
            isValid = false;
        }
        if (welcomeUser.email && welcomeUser.password && !welcomeUser.phoneNumber) {
            setErrorMessage('전화번호는 필수 입력 항목입니다.')
            isValid = false;
        }
        return isValid;
    }

    return (
        <form onSubmit={submitSignUp}>
            <div className='relative flex justify-center items-center mt-[120px] mb-[25px] 
            w-[560px] h-[680px] rounded-[50px] shadow-[6px_4px_10px_#a5996e]'>
                <img src='/images/dodam_signup.png' className='w-[440px] h-[600px]'/>
                <div className='absolute mt-40 w-[360px] z-10'>
                    <h1 className='text-basic-size'>회원가입</h1>
                    <SignUpForm welcomeUser={welcomeUser} setWelcomeUser={setWelcomeUser}/>
                    <SignUpCheck errorMessage={errorMessage}/>
                    <button className='btn -mt-4' type='submit'>가입하기</button>
                </div>
            </div>
        </form>
    );
};

export default SignUpPage;