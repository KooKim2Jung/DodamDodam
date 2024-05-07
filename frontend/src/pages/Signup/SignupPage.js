import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/Api';

const SignupForm = () => {
    const [welcomeUser, setWelcomeUser] = useState({
        email: '',
        password: '',
        passwordCheck: '',
    })
    const navigate = useNavigate();

    const [errorCheck, setErrorCheck] = useState({
        emailError: '',
        passwordError: '',
        passwordCheckError: '',
    })    

    const submitWelcomeUser = (e) => {
        const { name, value } = e.target;
        setWelcomeUser(welcomeUser => ({
            ...welcomeUser,
            [name]: value
        }))
    }

    const validateForm = () => {
        resetForm();

        if (!welcomeUser.email) {
            setErrorCheck(prevState => ({
                ...prevState,
                emailError: '이메일을 입력해주세요.'
            }));
        }
        if (welcomeUser.email && !welcomeUser.password) {
            setErrorCheck(prevState => ({
                ...prevState,
                passwordError: '비밀번호를 입력해주세요.'
            }));
        }
        if (welcomeUser.password !== welcomeUser.passwordCheck) {
            setErrorCheck(prevState => ({
                ...prevState,
                passwordError: '비밀번호를 확인해주세요.'
            }));
        }
    }

    const resetForm = () => {
        setErrorCheck({
            emailError: '',
            passwordError: '',
            passwordCheckError: '',
        });
    }

    const handleLogin = () => {
        navigate('/loginPage');
    }

    const submitSignup  = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await api.post('/v1/users/join', {
                    email: welcomeUser.email,
                    password: welcomeUser.password,
                });
                console.log(response);
                const token = response.data.token; // 응답에서 토큰을 추출
                localStorage.setItem('jwtToken', token); // localStorage에 토큰 저장
                // 성공적인 응답 처리
                handleLogin();

            } catch (error) {
                console.error("회원가입 요청 오류", error);
                // 오류 처리
            }
        }
    };

    return (
        <form onSubmit={submitSignup} onChange={submitWelcomeUser}>
            <div className='flex justify-center items-center bg-signup-image bg-center bg-no-repeat mt-[120px] mb-[25px] 
            w-[700px] h-[550px] rounded-[10px] shadow-[6px_4px_10px_#a5996e] bg-[length:42%_98%]'>
                <div className='flex flex-col mt-[150px]'>
                    <h1 className='text-basic-size mt-2'>회원가입</h1>
                    <input className='input-box'
                        type="email"
                        name='email'
                        value={welcomeUser.email}
                        placeholder='이메일'
                    />
                    <input className='input-box'
                        type="password"
                        name='password'
                        value={welcomeUser.password}
                        placeholder='비밀번호'
                    />
                    <input className='input-box'
                        type="password"
                        name='passwordCheck'
                        value={welcomeUser.passwordCheck}
                        placeholder='비밀번호 확인'
                    />
                    <div className='text-small-size text-red-500 mb-4'>{errorCheck.emailError}</div>
                    <div className='text-small-size text-red-500 mb-4'>{errorCheck.passwordError}</div>
                    <div className='text-small-size text-red-500 mb-4'>{errorCheck.passwordCheckError}</div>
                    <button className='btn -mt-9' type='submit'>가입하기</button>
                </div>
            </div>
        </form>
    );
};

export default SignupForm;