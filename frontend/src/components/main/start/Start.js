import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
    const [animation, setAnimation] = useState({
        rightAnimation: '',
        leftAnimation: '',
        dodamAnimation: '',
    })

    const navigate = useNavigate();

    useEffect(() => {
        setAnimation({
            rightAnimation: 'animate-translate-right-dodam',
            leftAnimation: 'animate-translate-left-dodam',
            dodamAnimation: 'animate-translate-dodam'
        });
    }, []);

    const handlestart = () => {
        navigate('/LoginPage');
    }

    return (
        <div className='flex items-center justify-center m-[160px_auto_85px_auto] w-[100vw] max-w-full h-[500px]'>
            <img className={`relative -left-[170px] -top-24 w-[390px] h-[440px] ${animation.dodamAnimation}`} src="./images/dodam_basic.png"/>
            <div className='flex flex-col relative -top-2'>
                <h1 className={`relative text-title-size -left-40 top-28 ${animation.rightAnimation}`}>도담</h1>
                <h1 className={`relative text-title-size left-64 top-10 ${animation.leftAnimation}`}>도담</h1>
                <img className='relative -top-[295px] left-48 w-[140px] h-[140px]' src="./images/flower.png"/>
                <button className='relative -top-28 left-[160px] rounded-[15px] text-basic-size p-[2px_20px] 
                bg-transparent border-[4px] border-black hover:bg-black hover:text-white hover:duration-500' onClick={handlestart}>시작하기</button>
            </div>
        </div>
    );
};

export default Start;