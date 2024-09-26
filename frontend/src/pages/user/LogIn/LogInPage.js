import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import api from '../../../Service/Api';
import LogInForm from '../../../components/user/LogIn/LogInForm';
import { AppContext } from '../../../AppProvider';

const LogInPage = () => {
    const { setIsLoggedIn, setIsGuardianOpen, setIsWardSet, getSSE } = useContext(AppContext);

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogIn = () => {
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', 'true');
        getSSE();
    }

    const handleSignUp = () => {
        navigate('/SignUpPage')
    }

    const submitLogIn = async (data) => {
        try {
            const response = await api.post('/v1/auth/login', {
                email: data.email,
                password: data.password,
            });
            const token = response.data.token; 
            sessionStorage.setItem('jwtToken', token);
            handleLogIn();
            getSSE();
            checkWard();
        } catch (error) {
            setErrorMessage(error.response.data.detail);
        }
    };

    const checkWard = async () => {
        try {
            const wardResponse = await api.get('/v1/profile/check');
            if (wardResponse.data.check) {
                navigate('/WardPage');
                sessionStorage.setItem('isWardSet', 'true');
                setIsWardSet(true);
            }
            else {
                alert('피보호자 설정이 필요합니다.');
                sessionStorage.setItem('isWardSet', 'false');
                setIsGuardianOpen(true);
            }
        } catch (wardCheckError) {
            setErrorMessage('피보호자 정보 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    }   

    return (
        <div className='flex items-center justify-center bg-primary mt-16 md:mt-20 
        w-[700px] h-[450px] rounded-[50px] shadow-[6px_4px_10px_#a5996e]'>
            <div className='grid grid-cols-1 md:grid-cols-5 p-5'>
                <div className='col-span-2 flex items-center justify-center'>
                    <img src='/images/dodam_basic.png' className='hidden md:block w-[205px] h-[235px]'/>
                </div>
                <div className='col-span-3 flex-col p-4'>
                    <h1 className='text-basic-size'>로그인</h1>
                    <LogInForm onSubmit={submitLogIn} errorMessage={errorMessage}/>
                    <div className='flex flex-col items-center'>
                        <button className='btn' type='button' onClick={handleSignUp}>회원 가입하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;