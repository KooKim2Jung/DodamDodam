import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import { AppContext } from '../../../AppProvider';

const LogInForm = ({ onSubmit, errorMessage }) => {
    const { emailFocus, passwordFocus, setEmailFocus, setPasswordFocus } = useContext(AppContext);
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
                        required: '이메일을 입력해 주세요.',
                        // pattern: {
                        //     value: /\S+@\S+\.\S+/,
                        //     message: "이메일 형식에 맞지 않습니다."
                        // }
                    })}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                {isSubmitted ? (errors.email ? <FiAlertCircle color='red' className='absolute right-4' /> : <FiCheck color='blue' className='absolute right-4'/>)
                : null}
            </div>
            {errors.email && <div className='text-red-500 text-xl'>{errors.email.message}</div>}

            <div className='relative flex items-center justify-center my-3'>
                <input
                    className={`bg-secondary rounded-[50px] py-[8px] pl-4 pr-12 w-[365px] border-2 text-middle-size focus:outline-none transition-colors duration-300 ease-in-out
                    ${isSubmitted ? (errors.password ? (passwordFocus ? 'border-red-500' : 'border-red-300') : (passwordFocus ? 'border-blue-500' : 'border-blue-300')) : (passwordFocus ? 'border-white' : 'border-secondary')}`}
                    type="password"
                    name='password'
                    placeholder='비밀번호'
                    {...register('password', {
                        required: '비밀번호를 입력해 주세요',
                        // pattern: {
                        //     value: /^.{8,16}$/,
                        //     message: '비밀번호는 8자 이상 16자 이하여야 합니다.'
                        // }
                    })}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                {isSubmitted ? (errors.password ? <FiAlertCircle color='red' className='absolute right-4' /> : <FiCheck color='blue' className='absolute right-4'/>)
                : null}
            </div>
            {errors.password && <div className='text-red-500 text-xl'>{errors.password.message}</div>}

            {errorMessage && (
                <div className=" text-red-500 text-xl">{errorMessage}</div>
            )}
            <button className='btn mt-3' type='submit' disabled={isSubmitting} >로그인하기</button>
        </form>
    );
};

export default LogInForm;
