import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/Api';
import SignupForm from '../../../components/user/signup/SignupForm';
import SignupCheck from '../../../components/user/signup/SignupCheck';

const SignupPage = () => {
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

    const handleLogin = () => {
        navigate('/loginPage');
    }

    const submitSignup  = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await api.post('/v1/auth/join', {
                    email: welcomeUser.email,
                    password: welcomeUser.password,
                    phoneNumber: welcomeUser.phoneNumber
                });
                alert(response.data.message);
                handleLogin();
            } catch (signupError) {
                console.log("회원가입 요청 오류", signupError);
                const { message } = signupError.response.data;
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
        <form onSubmit={submitSignup}>
            <div className='flex justify-center items-center mt-[120px] mb-[25px] 
            w-[700px] h-[550px] rounded-[10px] shadow-[6px_4px_10px_#a5996e]'>
                <div className=' w-[300px]'>
                    <h1 className='text-basic-size mt-2'>회원가입</h1>
                    <SignupForm welcomeUser={welcomeUser} setWelcomeUser={setWelcomeUser}/>
                    <SignupCheck errorMessage={errorMessage}/>
                    <button className='btn -mt-4' type='submit'>가입하기</button>
                </div>
            </div>
        </form>
    );
};

export default SignupPage;