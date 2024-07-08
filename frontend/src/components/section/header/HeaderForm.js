import React from 'react';
import { FiLogIn, FiLogOut, FiUserPlus, FiUnlock, FiLock } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import '../../Wave.css';
import ToggleForm from '../../toggle/ToggleForm';

const HeaderForm = ({ isLoggedIn, setIsLoggedIn }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('jwtToken');
        navigate('/')
    }

    return (
        <header className='fixed top-0 left-0 h-[90px] w-screen shadow-[0px_2px_6px_#a5996e] z-40 bg-primary'>
            <h1 className='flex items-center justify-center mt-5 text-5xl'>
                <img className='h-10 w-11 mr-1 hidden md:block' src='./images/middle_flower.png'/>
                <a href="/">도담도담</a>
                <img className='h-10 w-11 ml-2 hidden md:block' src='./images/middle_flower.png'/>
            </h1>
            {isLoggedIn ? (<>
                <div className='absolute top-6 left-[30px] hidden md:left-[875px] md:block'><ToggleForm /></div>
                <a className='block md:hidden relative -top-10 left-[375px] pb-[5px]' href="/WardSettingsPage"><FiLock size='30'/></a>
                <a className='block md:hidden relative -top-[75px] left-[410px] pb-[5px]' href="/WardPage"><FiUnlock size='30'/></a>
                <nav className='wave absolute -top-10 left-[555px] ml-5'>
                    <button className='relative text-middle-size pb-[5px] hidden md:block' onClick={handleLogout}>로그아웃</button>
                    <button className='block md:hidden relative -top-[70px] right-[340px] pb-[5px]' onClick={handleLogout}><FiLogOut size='30'/></button>
                </nav>
            </>) : (
            <nav className='wave absolute -top-10 left-[500px]'>
                <a className='relative text-middle-size pb-[5px] hidden md:block' href="/SignupPage"><h2>회원가입</h2></a>
                <a className='relative text-middle-size pb-[5px] ml-[40px] hidden md:block' href="/LoginPage"><h2>로그인</h2></a>
                <a className='block md:hidden relative right-[340px] pb-[5px]' href="/SignupPage"><FiUserPlus size='30'/></a>
                <a className='block md:hidden relative right-[330px] pb-[5px]' href="/LoginPage"><FiLogIn size='30'/></a>
            </nav>
            )}
        </header>
    );
};

export default HeaderForm;