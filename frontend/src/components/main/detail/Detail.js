import React, { useEffect } from 'react';
import EmotionalAnalysis from './detailForm/emotionalanalysis/EmotionalAnalysis';
import ConversationSummary from './detailForm/conversationsummary/ConversationSummary';
import Scheduling from './detailForm/scheduling/Scheduling';
import Settings from './detailForm/settings/Settings';
import './Detail.css';

const Detail = () => {
    useEffect(() => {
        // Swiper가 전역 범위에서 사용 가능한지 확인
        const detailSwiper = new window.Swiper('.detailSwiper', {
            effect: 'coverflow',
            grabCursor: false,
            centeredSlides: true,
            slidesPerView: 'auto',
            parallax: true,
            speed: 600,
            coverflowEffect: {
                rotate: 0,
                stretch: -10,
                depth: 50,
                modifier: 7,
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
    <div className="swiper detailSwiper w-screen h-screen bg-primary">
        <div className="swiper-wrapper">
            <div className="swiper-slide"><EmotionalAnalysis /></div>
            <div className="swiper-slide"><ConversationSummary /></div>
            <div className="swiper-slide"><Scheduling /></div>
            <div className="swiper-slide"><Settings /></div>
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
    </div>
    );
};

export default Detail;