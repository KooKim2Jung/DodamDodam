import React, { useContext, useEffect } from 'react';
import { FiLogIn, FiLogOut, FiUserPlus, FiToggleLeft, FiToggleRight, FiBook } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import '../../Wave.css';
import Toggle from '../../guardians/Guardian/Toggle/Toggle';
import Help from '../../guardians/Guardian/Help/Help';
import { AppContext } from '../../../AppContext';

const Header = ({ pageAddress }) => {
    const { isLoggedIn, setIsLoggedIn, isGuardian, setIsGuardian, isHelpOpen, setIsHelpOpen } = useContext(AppContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsGuardian(false);
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('jwtToken');
        navigate('/');
    }

    const handleHelp = () => {
        setIsHelpOpen(true)
    }

    return (
        <div>
        <header className='fixed top-0 left-0 h-[90px] w-screen shadow-[0px_2px_6px_#a5996e] z-[1000] bg-primary flex items-center justify-center'>
            <h1 className='absolute left-[35%] md:left-[45%] lg:left-1/2 transform -translate-x-1/2 flex items-center text-4xl md:text-5xl transition-all duration-400'>
                <img className='h-10 w-11 mr-1 hidden lg:block' src='./images/middle_flower.png' alt="꽃"/>
                <a href="/">도담도담</a>
                <img className='h-10 w-11 ml-2 hidden lg:block' src='./images/middle_flower.png' alt="꽃"/>
            </h1>
            <div className='absolute right-10 flex items-center'>
                {isLoggedIn ? (<>
                    <div className='flex items-center wave'>
                        <div className='relative hidden lg:block mr-16'><Toggle /></div>
                        <a className='block lg:hidden relative mr-4 pb-1' href="/WardSettingsPage"><FiToggleRight size='30' /></a>
                        <a className='block lg:hidden relative mr-4 pb-1' href="/WardPage"><FiToggleLeft size='30' /></a>
                    </div>
                    <div className='flex items-center wave'>
                        {isGuardian && (<>
                            <div className='relative text-middle-size hidden lg:block mr-6 z-40'><Help pageAddress={pageAddress}></Help></div>
                            <button className='block lg:hidden relative mr-4 pb-1' onClick={handleHelp}><FiBook size='30'></FiBook></button>
                        </>)}
                        <button className='relative text-middle-size hidden lg:block' onClick={handleLogout}>로그아웃</button>
                        <button className='block lg:hidden relative pb-1' onClick={handleLogout}><FiLogOut size='30' /></button>
                    </div>
                </>) : (
                    <div className='flex items-center wave'>
                        <a className='relative text-middle-size hidden md:block mr-6' href="/SignUpPage"><h2>회원가입</h2></a>
                        <a className='relative text-middle-size hidden md:block' href="/LogInPage"><h2>로그인</h2></a>
                        <a className='block md:hidden relative mr-4 pb-1' href="/SignUpPage"><FiUserPlus size='30' /></a>
                        <a className='block md:hidden relative pb-1' href="/LogInPage"><FiLogIn size='30' /></a>
                    </div>
                )}
            </div>
        </header>
        {isHelpOpen && (
            <div className='fixed z-10 top-[90px] left-0 bg-black bg-opacity-50 w-screen h-[calc(100vh-90px)]'></div>
        )}
        </div>
    );
};

export default Header;
