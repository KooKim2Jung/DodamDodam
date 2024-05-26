import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import api from '../../services/Api';

const LoginPage = ({ setIsLoggedIn }) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        setIsLoggedIn(true);
        navigate('/WardPage')
    }

    const handleSignup = () => {
        navigate('/SignupPage')
    }

    const submitUser = (e) => {
        const { name, value } = e.target;
        setUser(user => ({
            ...user,
            [name]: value
        }))
    }

    const validateForm = () => {
        resetForm();

        let isValid = true;
        if (!user.email) {
            setEmailError('이메일을 입력해주세요.')
            isValid = false;
        } 
        if (user.email && !user.password) {
            setPasswordError('비밀번호를 입력해주세요.')
            isValid = false;
        }
        console.log(isValid);
        return isValid;
    }

    const resetForm = () => {
        setEmailError('')
        setPasswordError('')
    }

    const submitLogin = async (event) => {
        event.preventDefault();
        handleLogin();
        if (validateForm()) {
            try {
                const response = await api.post('/v1/auth/login', {
                    email: user.email,
                    password: user.password,
                });
                console.log(response);
                const token = response.data.token; // 응답에서 토큰을 추출
                localStorage.setItem('jwtToken', token); // localStorage에 토큰 저장
                // 성공적인 응답 처리
                handleLogin();

            } catch (error) {
                console.error("로그인 요청 오류", error);
                setEmailError('존재하지 않는 이메일입니다.')
                // 오류 처리
            }
        }
    };

    return (
        <form onSubmit={submitLogin}>
            <div className='flex items-center justify-center bg-primary mt-[120px] mb-[25px] w-[700px] h-[550px] rounded-[10px] shadow-[6px_4px_10px_#a5996e]'>
                <div className='w-[205px] h-[235px] mr-8 bg-basic-image bg-center bg-no-repeat bg-[length:98%_97%]'></div>
                <div className='w-[300px]'>
                    <h1 className='text-basic-size mb-5'>로그인</h1>
                    <input className='input-box'
                        type="email"
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
                    <div className='text-small-size mb-4 mt-2 text-gray-500'><a href="#">비밀번호를 잊으셨나요?</a></div>
                    <div className='text-small-size text-red-500 mb-4'>{emailError}</div>
                    <div className='text-small-size text-red-500 mb-4'>{passwordError}</div>
                    <button className='btn' type='submit'>로그인하기</button>
                    <button className='btn' type='button' onClick={handleSignup}>회원 가입하기</button>
                </div>
            </div>
        </form>
    );
};

export default LoginPage;