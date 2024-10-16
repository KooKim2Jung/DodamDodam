import React, { useEffect } from 'react';
import EmotionalAnalysis from './detailForm/Emotionalanalysis/EmotionalAnalysis';
import ConversationSummary from './detailForm/Conversationsummary/ConversationSummary';
import Scheduling from './detailForm/Scheduling/Scheduling';
import Settings from './detailForm/Settings/Settings';
import HomeSettings from './detailForm/HomeSettings/HomeSettings';
import './Detail.css';

const Detail = () => {
    useEffect(() => {
        // Swiper가 전역 범위에서 사용 가능한지 확인
        const detailSwiper = new window.Swiper('.detailSwiper', {
            effect: 'coverflow',
            grabCursor: false,
            centeredSlides: true,
            slidesPerView: 'auto',
            spaceBetween: 300,
            parallax: true,
            speed: 600,
            coverflowEffect: {
                rotate: 0,
                stretch: 10,
                depth: 50,
                modifier: 5,
                slideShadows: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            allowTouchMove: false,
        });
    }, []);

    return (
    <div className="swiper detailSwiper w-screen h-screen">
        <div className="swiper-wrapper w-screen pt-[25px] md:pt-[40px]">
            <div className="swiper-slide"><ConversationSummary /></div>
            <div className="swiper-slide"><EmotionalAnalysis /></div>
            <div className="swiper-slide"><Scheduling /></div>
            <div className="swiper-slide"><HomeSettings/></div>
            <div className="swiper-slide"><Settings /></div>
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
    </div>
    );
};

export default Detail;