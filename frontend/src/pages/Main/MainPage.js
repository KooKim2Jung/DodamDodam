import React, { useEffect } from 'react';
import Start from '../../components/main/start/Start';
import About from '../../components/main/about/About';
import Detail from '../../components/main/detail/Detail';
import './Main.css';

const MainPage = () => {
    useEffect(() => {
        const mainSwiper = new window.Swiper(".mainSwiper", {
            direction: "vertical",
            slidesPerView: 1,
            spaceBetween: 30,
            mousewheel: true,
            parallax: true,
            speed: 900,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
          });
    }, []);

    return (
        <>
        <div className="swiper mainSwiper h-screen">
            <div className="swiper-wrapper">
                <div className="swiper-slide"><Start/></div>
                <div className="swiper-slide"><About/></div>
                <div className="swiper-slide"><Detail/></div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        </>
    );
};

export default MainPage;