import React from 'react';
import { useForm } from 'react-hook-form';

const LogInForm = ({ onSubmit, errorMessage }) => {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className='input-box'
                type="text"
                name='email'
                placeholder='이메일'
                {...register('email', {
                    required: '이메일을 입력해 주세요.',
                })}
            />
            {errors.email && <div className='mb-2'>{errors.email.message}</div>}
            <input className='input-box'
                type="password"
                name='password'
                placeholder='비밀번호'
                {...register('password', {
                    required: '비밀번호를 입력해 주세요',
                })}
            />
            {errors.password && <div className='mb-2'>{errors.password.message}</div>}
            {errorMessage && (
                <div className="mb-2">
                    {errorMessage}
                </div>
            )}
            <button className='btn' type='submit' disabled={isSubmitting} >로그인하기</button>
        </form>
    );
};

export default LogInForm;