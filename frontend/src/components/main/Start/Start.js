import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../AppProvider';

const Start = () => {
    const { isLoggedIn } = useContext(AppContext);
    const [animation, setAnimation] = useState({
        rightAnimation: '',
        leftAnimation: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        setAnimation({
            rightAnimation: 'animate-translate-right-dodam',
            leftAnimation: 'animate-translate-left-dodam',
        });
    }, []);

    const handlestart = () => {
        if (isLoggedIn) {
            navigate('/WardPage');
        } 
        else {
            navigate('/LogInPage');
        }
    };

    return (
        <div className='relative flex flex-row items-center justify-center w-screen h-screen pt-[60px] md:pt-[90px] overflow-hidden'>
            <div className='relative flex items-center md:mr-5'>
                <img className='w-[55vh] h-[60vh] object-contain hover:scale-105' src="./images/dodam_basic.png" />
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center'>
                    <h1 className={`text-[12vh] md:text-[15vh] leading-none lg:text-[20vh] hover:scale-105 transition-all duration-300 mr-2 md:mr-5 ${animation.rightAnimation}`}>도담</h1>
                    <img className='lg:-mt-2 w-[10vh] h-[15vh] md:w-[15vh] md:h-[20vh] lg:w-[20vh] lg:h-[25vh] object-contain hover:scale-110' src="./images/large_flower.png" />
                </div>
                <div className='lg:ml-24'>
                    <h1 className={`text-[12vh] md:text-[15vh] leading-none lg:text-[20vh] bg-transparent hover:scale-105 transition-all duration-300 ${animation.leftAnimation}`}>도담</h1>
                </div>
                <div className='lg:ml-28'>
                    <button className='w-[35vh] md:w-[40vh] h-[13vh] border-[0.7vh] m-3
                    border-black text-[6vh] md:text-[7vh] lg:text-[8vh] rounded-full transition-all duration-300 hover:border-4
                    hover:border-secondary hover:text-borderColor hover:bg-white hover:scale-110' onClick={handlestart}>시작하기</button>
                </div>
            </div>
        </div>
    );
};

export default Start;