import React, { useState } from 'react';
import '../Wave.css';
import Toggle from '../Toggle/Toggle';

const UserHeaderForm = () => {
    return (
        <header className='flex items-center justify-center fixed p-[20px_40px_20px_250px] top-0 left-0 h-[95px] w-full border-black border-b-2 z-40 bg-primary'>
            <h1 className='flex items-center justify-center m-[0px_auto] text-5xl pl-[205.5px]'>
                <img className='h-10 w-10' src='./image/flower.png'/>
                <a href="/">도담도담</a>
                <img className='h-10 w-10' src='./image/flower.png'/>
            </h1>
            <Toggle/>
            <nav className='wave'>
                <a className='relative text-middle-size pb-[5px] ml-[40px]' href="/LoginPage"><h2>로그아웃</h2></a>
                <a className='relative text-middle-size pb-[5px] ml-[40px]' href="#"><h2>내 정보</h2></a>
            </nav>
        </header>
    );
};

export default UserHeaderForm;