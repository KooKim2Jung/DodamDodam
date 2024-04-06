import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import MainFooterForm from '../../components/Footer/MainFooterForm';

const MainPage = () => {
    const navigate = useNavigate();

    const handlestart = () => {
        navigate('/ProtectorPage');
    }

    return (
        <div className='main-box'>
            <img className='dodam-main' src="./image/dodam_basic.png"/>
            <div className="main-container">
                <h1>도담</h1>
                <h1>도담</h1>
                <img className='flower-main' src="./image/flower.png"/>
                <button className="btn" onClick={handlestart}>시작하기</button>
            </div>
            <MainFooterForm/>
        </div>
    );
};

export default MainPage;