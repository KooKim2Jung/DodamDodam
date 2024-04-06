import React from 'react';
import AboutFooterForm from '../../../components/Footer/AboutFooterForm';
import './AboutPage.css';

const AboutPage = () => {
    return (
        <div className='main-box'>
            <div className='dodam-meaning'><h2>도담도담</h2>
            <h3>: 어린아이가 탈 없이 잘 자라는 모양</h3></div>
            <div className="about-box">
                <div className="about-container">
                    <div className="about-item">
                        <img className="star" src="./image/star.png"/>
                        <img className="front-image1" src="./image/love.png"/>
                        <div className="about-text">
                            <h2>감정 분석</h2>대화내용을 분석해서 <br/>감정 상태를 알려줘요.
                        </div>
                    </div>
                    <div className="about-item">
                        <div className="about-text">
                            <h2>스케줄링</h2>피보호자의 스케줄을 <br/>설정하면 시간에 맞춰서 <br/>알려줘요.
                        </div>
                            <img className="star" src="./image/star.png"/>
                            <img className="front-image2" src="./image/clock.png"/>
                        
                    </div>
                </div>
                <div className="about-container">
                    <div className="about-item">
                        <img className="star" src="./image/star.png"/>
                        <img className="front-image1" src="./image/speechbubble.png"/>
                        <div className="about-text">
                            <h2>대화 요약</h2>대화의 중요한 내용을 <br/>요약해서 알려줘요.
                        </div>
                    </div>
                    <div className="about-item">
                        <div className="about-text">
                            <h2>맞춤 설정</h2>피보호자의 정보를 <br/>입력해서 맞춤 서비스를 <br/>제공받을 수 있어요.
                        </div>
                        <img className="star" src="./image/star.png"/>
                        <img className="front-image2" src="./image/setting.png"/>
                    </div>
                </div>
            </div>
            <AboutFooterForm/>
        </div>
    );
};

export default AboutPage;