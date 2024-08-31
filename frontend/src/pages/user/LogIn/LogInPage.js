import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import api from '../../../Service/Api';
import LogInForm from '../../../components/user/LogIn/LogInForm';
import LogInCheck from '../../../components/user/LogIn/LogInCheck';
import { AppContext } from '../../../AppProvider';

const LogInPage = () => {
    const { setIsLoggedIn, setIsEdit, setIsGuardianOpen, setIsWardSetting } = useContext(AppContext);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogIn = () => {
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', 'true');
    }

    const handleSignUp = () => {
        navigate('/SignUpPage')
    }

    const submitLogIn = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await api.post('/v1/auth/login', {
                    email: user.email,
                    password: user.password,
                });
                const token = response.data.token; 
                sessionStorage.setItem('jwtToken', token);
                handleLogIn();
                checkWard();
            } catch (logInError) {
                console.error("로그인 요청 오류", logInError);
                const message = logInError.response.data.detail;
                setErrorMessage(message);
            }
        }
    };

    const checkWard = async () => {
        try {
            const wardResponse = await api.get('/v1/profile/check');
            if (wardResponse.data.check) {
                navigate('/WardPage');
                setIsWardSetting(true);
            }
            else {
                alert('피보호자 설정이 필요합니다.');
                setIsGuardianOpen(true);
            }
        } catch (wardCheckError) {
            console.error("피보호자 정보 요청 오류", wardCheckError);
            setErrorMessage('피보호자 정보 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    }

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
        <form onSubmit={submitLogIn}>
            <div className='flex items-center justify-center bg-primary mt-[120px] mb-[25px] 
            w-[700px] h-[450px] rounded-[50px] shadow-[6px_4px_10px_#a5996e]'>
                <div className='flex mx-10 pl-4'>
                    <img src='/images/dodam_basic.png' className='w-[205px] h-[235px] relative top-[70px]'/>
                    <div>
                        <h1 className='text-basic-size'>로그인</h1>
                        <LogInForm user={user} setUser={setUser}/>
                        <LogInCheck errorMessage={errorMessage}/>
                        <button className='btn' type='submit' >로그인하기</button>
                        <button className='btn' type='button' onClick={handleSignUp}>회원 가입하기</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LogInPage;