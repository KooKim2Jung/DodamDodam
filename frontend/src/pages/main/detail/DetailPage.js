import React, { useEffect } from 'react';
import FooterForm from '../../../components/section/footer/FooterForm';
import EmotionalAnalysis from '../../../components/detail/emotionalanalysis/EmotionalAnalysis';
import ConversationSummary from '../../../components/detail/conversationsummary/ConversationSummary';
import Scheduling from '../../../components/detail/scheduling/Scheduling';
import Settings from '../../../components/detail/settings/Settings';
import './Detail.css';

const DetailPage = () => {
    useEffect(() => {
        // Swiper가 전역 범위에서 사용 가능한지 확인
        const swiperInstance = new window.Swiper('.mySwiper', {
            effect: 'coverflow',
            grabCursor: false,
            centeredSlides: true,
            slidesPerView: 'auto',
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
        <div>
            <div className="swiper mySwiper w-screen">
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><EmotionalAnalysis /></div>
                    <div className="swiper-slide"><ConversationSummary /></div>
                    <div className="swiper-slide"><Scheduling /></div>
                    <div className="swiper-slide"><Settings /></div>
                </div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>
            <FooterForm />
        </div>
    );
};

export default DetailPage;