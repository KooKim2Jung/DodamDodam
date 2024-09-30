import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import { AppContext } from '../../../AppProvider';

const SignUpForm = ({ onSubmit, errorMessage }) => {
    const { emailFocus, passwordFocus, phoneNumberFocus, setEmailFocus, setPasswordFocus, setPhoneNumberFocus } = useContext(AppContext);
    const { register, handleSubmit, formState: { isSubmitting, isSubmitted, errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='relative flex items-center justify-end mb-3'>
                <input 
                    className={`bg-secondary rounded-[50px] py-[8px] pl-4 pr-12 w-[365px] border-2 text-middle-size focus:outline-none transition-colors duration-300 ease-in-out
                    ${isSubmitted ? (errors.email ? (emailFocus ? 'border-red-500' : 'border-red-300') : (emailFocus ? 'border-blue-500' : 'border-blue-300')) : (emailFocus ? 'border-white' : 'border-secondary')}`}
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
                {isSubmitted ? (errors.email ? <FiAlertCircle color='red' className='absolute right-4' /> : <FiCheck color='blue' className='absolute right-4'/>)
                : null}
            </div>
            {errors.email && <div className='text-red-500 text-xl'>{errors.email.message}</div>}
            <div className='relative flex items-center justify-end my-3'>
                <input 
                    className={`bg-secondary rounded-[50px] py-[8px] pl-4 pr-12 w-[365px] border-2 text-middle-size focus:outline-none transition-colors duration-300 ease-in-out
                    ${isSubmitted ? (errors.password ? (passwordFocus ? 'border-red-500' : 'border-red-300') : (passwordFocus ? 'border-blue-500' : 'border-blue-300')) : (emailFocus ? 'border-white' : 'border-secondary')}`}
                    type="password"
                    name='password'
                    placeholder='비밀번호(8~16자 영문자, 특수문자 포함)'
                    {...register('password', {
                        required: '비밀번호는 필수항목입니다.',
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/,
                            message: '비밀번호는 8~16자 사이이며, 최소 한 개의 영문자와 특수문자를 포함해야 합니다.'
                        }                    
                    })}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                {isSubmitted ? (errors.password ? <FiAlertCircle color='red' className='absolute right-4' /> : <FiCheck color='blue' className='absolute right-4'/>)
                : null}
            </div>
            {errors.password && <div className='text-red-500 text-xl'>{errors.password.message}</div>}
            <div className='relative flex items-center justify-end my-3'>
                <input
                    className={`bg-secondary rounded-[50px] py-[8px] pl-4 pr-12 w-[365px] border-2 text-middle-size focus:outline-none transition-colors duration-300 ease-in-out
                    ${isSubmitted ? (errors.phoneNumber ? (phoneNumberFocus ? 'border-red-500' : 'border-red-300') : (phoneNumberFocus ? 'border-blue-500' : 'border-blue-300')) : (phoneNumberFocus ? 'border-white' : 'border-secondary')}`}
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
                {isSubmitted ? (errors.phoneNumber ? <FiAlertCircle color='red' className='absolute right-4' /> : <FiCheck color='blue' className='absolute right-4'/>)
                : null}
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