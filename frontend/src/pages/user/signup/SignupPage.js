import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/Api';
import SignupForm from '../../../components/user/signup/SignupForm';
import SignupCheck from '../../../components/user/signup/SignupCheck';

const SignupPage = () => {
    const [welcomeUser, setWelcomeUser] = useState({
        email: '',
        password: '',
        passwordCheck: '',
    })
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('')    

    const validateForm = () => {
        resetForm();

        let isValid = true;
        if (!welcomeUser.email) {
            setErrorMessage('이메일을 입력해주세요.')
            isValid = false;
        }
        if (welcomeUser.email && !welcomeUser.password) {
            setErrorMessage('비밀번호를 입력해주세요.')
            isValid = false;
        }
        if (welcomeUser.password !== welcomeUser.passwordCheck) {
            setErrorMessage('비밀번호를 확인해주세요.')
            isValid = false;
        } 
        return isValid;
    }

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
                });
                console.log(response);
                // 성공적인 응답 처리
                handleLogin();

            } catch (error) {
                console.error("회원가입 요청 오류", error);
                // 오류 메시지에서 에러 코드를 제외하고 사용자에게 보여줄 메시지만 설정
                const errorMsg = error.response.data;
                if (errorMsg.includes('USEREMAIL_DUPLICATED')) {
                    setErrorMessage(errorMsg.replace('USEREMAIL_DUPLICATED', ''));
                } 
                else {
                    setErrorMessage('회원가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
                }
            }
        }
    };

    return (
        <form onSubmit={submitSignup}>
            <div className='flex justify-center items-center bg-signup-image bg-contain bg-center bg-no-repeat mt-[120px] mb-[25px] 
            w-[700px] h-[550px] rounded-[10px] shadow-[6px_4px_10px_#a5996e]'>
                <div className='mt-[150px] w-[300px]'>
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