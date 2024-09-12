import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../Wave.css';

const Aside = () => {
    const menu = [
        { 
            title: "대화 내용 보기", 
            url: "/ViewConversationPage",
            image: "./images/speechbubble.png"
        },
        { 
            title: "감정 분석 보기", 
            url: "/ViewEmotionAnalysisPage",
            image: "./images/love.png"
        },
        { 
            title: "스케줄 지정", 
            url: "/SchedulePage",
            image: "./images/clock.png" 
        },
        { 
            title: "도담이 설정", 
            url: "/DodamSettingsPage",
            image: "./images/dodam_basic.png"
        },
        { 
            title: "집 정보 설정", 
            url: "/HomeInformationSettingsPage",
            image: "./images/memo.png" 
        },
        { 
            title: "피보호자 설정", 
            url: "/WardSettingsPage",
            image: "./images/setting.png" 
        },
    ];

    const location = useLocation();

    const imageLocation = (menu) => {
        if (location.pathname === menu.url) {
            return "./images/orange_star.png";
        } else {
            return "./images/star.png";
        }
    };

    return (
        <aside className='fixed hidden md:block left-0 top-0 h-screen shadow-[1px_0px_6px_#a5996e] z-2 bg-primary overflow-auto'>
            <nav className='flex flex-col items-start justify-between mt-[80px] h-[90vh]'>
                {menu.map((menu, index) => (
                    <Link key={index} to={menu.url}> 
                        <div className='wave inline-flex items-center relative m-7 text-middle-size'>
                            <img className='flex w-[60px] h-[60px]' src={imageLocation(menu)}/>
                            <img className='relative -left-[43px] top-1 w-[25px] h-[25px] mr-[-20px]' src={menu.image}/>
                            <h2 className='wave'>{menu.title}</h2>
                        </div>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Aside;
