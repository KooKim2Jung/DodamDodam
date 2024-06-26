import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Wave.css';
import Toggle from '../Toggle/Toggle';

const UserHeaderForm = ({ setIsLoggedIn }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('jwtToken');
        navigate('/')
    }

    return (
        <header className='flex items-center justify-center fixed p-[20px_40px_20px_250px] top-0 left-0 h-[95px] w-full border-black border-b-2 z-40 bg-primary'>
            <h1 className='flex items-center justify-center m-[0px_auto] text-5xl pl-[205.5px]'>
                <img className='h-10 w-10' src='./image/flower.png'/>
                <a href="/">도담도담</a>
                <img className='h-10 w-10' src='./image/flower.png'/>
            </h1>
            <Toggle/>
            <nav className='wave'>
                <button className='relative text-middle-size pb-[5px] ml-[40px]' onClick={handleLogout}>로그아웃</button>
                <button className='relative text-middle-size pb-[5px] ml-[40px]' href="#">내 정보</button>
            </nav>
        </header>
    );
};

export default UserHeaderForm;