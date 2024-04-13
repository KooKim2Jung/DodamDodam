import React from 'react';
import '../Wave.css';

const NonUserHeaderForm = () => {
    return (
        <header className='flex items-center justify-center fixed p-[20px_40px_20px_250px] top-0 left-0 h-[95px] w-full border-black border-b-2 z-10 bg-primary'>
            <h1 className='flex items-center justify-center m-[0px_auto] text-5xl'>
                <img className='h-10 w-10' src='./image/flower.png'/>
                <a href="/">도담도담</a>
                <img className='h-10 w-10' src='./image/flower.png'/>
            </h1>
            <nav className='wave'>
                <a className='relative text-middle-size pb-[5px] ml-[40px]' href="/LoginPage">로그인</a>
                <a className='relative text-middle-size pb-[5px] ml-[40px]' href="/SignupPage">회원가입</a>
            </nav>
        </header>
    );
};

export default NonUserHeaderForm;