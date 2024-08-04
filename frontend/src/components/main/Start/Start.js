import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
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
        navigate('/LogInPage');
    };

    return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <div className='flex justify-center items-center'>
                <img className='absolute top-[160px] md:top-[160px] left-20 md:left-44 w-[200px] md:w-[390px] h-[230px] md:h-[440px] hover:scale-105' src="./images/dodam_basic.png" />
                <div className='flex flex-col items-center'>
                    <h1 className={`absolute text-5xl md:text-title-size md:left-[500px] top-[200px] left-[200px] md:top-52 hover:scale-105 ${animation.rightAnimation}`}>도담</h1>
                    <h1 className={`absolute text-5xl md:text-title-size left-[440px] md:left-[905px] top-[250px] md:top-[355px] bg-transparent md:w-[250px] w-[100px] hover:scale-105 ${animation.leftAnimation}`}>도담</h1>
                    <img className='absolute top-[195px] md:top-[200px] left-[380px] md:left-[860px] w-[60px] md:w-[150px] h-[50px] md:h-[140px] hover:scale-110' src="./images/large_flower.png" />
                    <button className='absolute top-[310px] md:top-[510px] left-[355px] md:left-[820px] md:w-[240px] md:px-9 md:py-2 border-2 md:border-4
                    border-black text-1xl md:text-basic-size rounded-full hover:border-4
                    hover:border-secondary hover:text-borderColor hover:bg-white hover:scale-110 px-3 py-1' onClick={handlestart}>시작하기</button>
                </div>
            </div>
        </div>
    );
};

export default Start;
