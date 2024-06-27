import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import api from '../../services/Api';
import LoginForm from '../../components/Login/LoginForm';
import LoginCheck from '../../components/Login/LoginCheck';

const LoginPage = ({ setIsLoggedIn, setIsEdit, setIsWardSetting }) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    }

    const handleSignup = () => {
        navigate('/SignupPage')
    }

    const submitLogin = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await api.post('/v1/auth/login', {
                    email: user.email,
                    password: user.password,
                });
                console.log(response);
                const token = response.data.token; 
                localStorage.setItem('jwtToken', token);
                handleLogin();
                try {
                    // 로그인 성공 후 피보호자 설정 확인
                    const wardResponse = await api.get('/v1/profile/check');
                    const check = wardResponse.data.check;
                    if (check) {
                        navigate('/WardPage');
                        setIsWardSetting(true);
                    }
                    else {
                        setIsEdit(true);
                        setIsWardSetting(false);
                        alert('피보호자 설정이 필요합니다.');
                        navigate('/WardSettingsPage');
                    }
                } catch (wardCheckError) {
                    console.error("피보호자 정보 요청 오류", wardCheckError);
                    setErrorMessage('피보호자 정보 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
                }
            } catch (loginError) {
                console.error("로그인 요청 오류", loginError);
                // 오류 메시지에서 에러 코드를 제외하고 사용자에게 보여줄 메시지만 설정
                const errorMsg = loginError.response?.data;
                if (errorMsg.includes('USEREMAIL_NOT_FOUND')) {
                    setErrorMessage(errorMsg.replace('USEREMAIL_NOT_FOUND', ''));
                } 
                else if (errorMsg.includes('INVALID_PASSWORD')) {
                    setErrorMessage(errorMsg.replace('INVALID_PASSWORD', ''));
                }
                else {
                    setErrorMessage('로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
                }
            }
        }
    };
    

    const validateForm = () => {
        resetForm();

        let isValid = true;
        if (!user.email) {
            setErrorMessage('이메일을 입력해주세요.')
            isValid = false;
        } 
        if (user.email && !user.password) {
            setErrorMessage('비밀번호를 입력해주세요.')
            isValid = false;
        }
        return isValid;
    }

    const resetForm = () => {
        setErrorMessage('')
    }

    return (
        <form onSubmit={submitLogin}>
            <div className='flex items-center justify-center bg-primary mt-[120px] mb-[25px] w-[700px] h-[550px] rounded-[10px] shadow-[6px_4px_10px_#a5996e]'>
                <div className='w-[205px] h-[235px] mr-8 bg-basic-image bg-center bg-no-repeat bg-[length:98%_97%]'></div>
                <div className='w-[300px]'>
                    <h1 className='text-basic-size mb-5'>로그인</h1>
                    <LoginForm user={user} setUser={setUser}/>
                    <div className='text-small-size mb-4 mt-2 text-gray-500'><a href="#">비밀번호를 잊으셨나요?</a></div>
                    <LoginCheck errorMessage={errorMessage}/>
                    <button className='btn' type='submit' >로그인하기</button>
                    <button className='btn' type='button' onClick={handleSignup}>회원 가입하기</button>
                </div>
            </div>
        </form>
    );
};

export default LoginPage;