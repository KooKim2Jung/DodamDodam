import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterForm from '../../components/section/footer/FooterForm';

const MainPage = () => {
    const navigate = useNavigate();

    const handlestart = () => {
        navigate('/ViewConversationPage');
    }

    return (
        <div className='flex items-center justify-center m-[125px_auto_85px_auto] w-[100vw] max-w-full h-[500px]'>
            <img className='relative -left-[170px] w-[390px] h-[440px]' src="./image/dodam_basic.png"/>
            <div className='flex flex-col'>
                <h1 className='relative text-title-size -left-16 top-28'>도담</h1>
                <h1 className='relative text-title-size left-28 top-10'>도담</h1>
                <img className='relative -top-[295px] left-48 w-[140px] h-[140px]' src="./image/flower.png"/>
                <button className='relative -top-28 left-[160px] rounded-[15px] text-basic-size p-[2px_20px] bg-transparent border-[4px] border-black' onClick={handlestart}>시작하기</button>
            </div>
            <FooterForm/>
        </div>
    );
};

export default MainPage;