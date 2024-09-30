import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiAlertCircle } from "react-icons/fi";

const SignUpForm = ({ onSubmit, errorMessage }) => {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='relative flex items-center justify-end mb-3'>
                <input 
                    className={`bg-secondary rounded-[50px] py-[8px] pl-4 pr-12 w-[365px] border-2 text-middle-size focus:outline-none transition-colors duration-300 ease-in-out
                    ${errors.email ? (emailFocus ? 'border-red-500' : 'border-red-300') : (emailFocus ? 'border-white' : 'border-secondary')}`}
                    type="text"
                    name='email'
                    placeholder='이메일'
                    {...register('email', {
                        required: '이메일은 필수항목입니다.',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "유효한 이메일 형식이어야 합니다."
                        }
                    })}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                {errors.email && <FiAlertCircle color='red' className='absolute right-4' />}
            </div>
            {errors.email && <div className='text-red-500 text-xl'>{errors.email.message}</div>}
            <div className='relative flex items-center justify-end my-3'>
                <input 
                    className={`bg-secondary rounded-[50px] py-[8px] pl-4 pr-12 w-[365px] border-2 text-middle-size focus:outline-none transition-colors duration-300 ease-in-out
                    ${errors.password ? (passwordFocus ? 'border-red-500' : 'border-red-300') : (passwordFocus ? 'border-white' : 'border-secondary')}`}
                    type="password"
                    name='password'
                    placeholder='비밀번호(8~16자 영문자, 특수문자 포함)'
                    {...register('password', {
                        required: '비밀번호는 필수항목입니다.',
                        pattern: {
                            value: /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/,
                            message: "비밀번호는 8~16자 사이이며, 최소 한 개의 특수문자가 포함되어야 합니다."
                        }                        
                    })}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                {errors.password && <FiAlertCircle color='red' className='absolute right-4' />}
            </div>
            {errors.password && <div className='text-red-500 text-xl'>{errors.password.message}</div>}
            <div className='relative flex items-center justify-end my-3'>
                <input
                    className={`bg-secondary rounded-[50px] py-[8px] pl-4 pr-12 w-[365px] border-2 text-middle-size focus:outline-none transition-colors duration-300 ease-in-out
                    ${errors.phoneNumber ? (phoneNumberFocus ? 'border-red-500' : 'border-red-300') : (phoneNumberFocus ? 'border-white' : 'border-secondary')}`}
                    type="number"
                    name='phoneNumber'
                    placeholder='전화번호(11자리, -제외)'
                    {...register('phoneNumber', {
                        required: '전화번호는 필수항목입니다.',
                        minLength: {
                            value: 11,
                            message: '전화번호는 숫자 11자리여야 합니다.'
                        },
                        maxLength: {
                            value: 11,
                            message: '전화번호는 숫자 11자리여야 합니다.'
                        }
                    })}
                    onFocus={() => setPhoneNumberFocus(true)}
                    onBlur={() => setPhoneNumberFocus(false)}
                />
                {errors.phoneNumber && <FiAlertCircle color='red' className='absolute right-4' />}
            </div>
            {errors.phoneNumber && <div className='text-red-500 text-xl'>{errors.phoneNumber.message}</div>}
            
            {errorMessage && (
            <div className=" text-red-500 text-xl">{errorMessage}</div>
            )}
            <button className='btn mt-3' type='submit' disabled={isSubmitting}>가입하기</button>
        </form>
    );
};

export default SignUpForm;