import React from 'react';
import '../../Wave.css';

const NonUserHeaderForm = () => {
    return (
        <header className='flex items-center justify-center fixed p-[20px_40px_20px_250px] top-0 left-0 h-[95px] w-full shadow-[0px_2px_6px_#a5996e] z-40 bg-primary'>
            <h1 className='flex items-center justify-center m-[0px_auto] text-5xl'>
                <img className='h-10 w-11 mr-1' src='./images/middle_flower.png'/>
                <a href="/">도담도담</a>
                <img className='h-10 w-11 ml-2' src='./images/middle_flower.png'/>
            </h1>
            <nav className='wave'>
                <a className='relative text-middle-size pb-[5px] ml-[40px]' href="/LoginPage"><h2>로그인</h2></a>
                <a className='relative text-middle-size pb-[5px] ml-[40px]' href="/SignupPage"><h2>회원가입</h2></a>
            </nav>
        </header>
    );
};

export default NonUserHeaderForm;