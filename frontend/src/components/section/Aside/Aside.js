import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../Wave.css';

const Aside = () => {
    const features = [
        { 
            title: "대화내용 보기", 
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

    const imageLocation = (features) => {
        if (location.pathname === features.url) {
            return "./images/orange_star.png";
        } else {
            return "./images/star.png";
        }
    };

    useEffect(()=> {
        console.log(location.pathname)
    }, [location.pathname])

    return (
        <aside className='fixed left-0 top-4 h-full shadow-[1px_0px_6px_#a5996e] z-0 bg-primary overflow-y-auto'>
            <nav className='flex flex-col items-start mt-[97px]'>
                {features.map((features, index) => (
                    <Link key={index} to={features.url}> 
                        <div className='wave inline-flex items-center relative m-7 text-middle-size'>
                            <img className='flex w-[60px] h-[60px]' src={imageLocation(features)}/>
                            <img className='relative -left-[43px] top-1 w-[25px] h-[25px] mr-[-20px]' src={features.image}/>
                            <h2 className='wave'>{features.title}</h2>
                        </div>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Aside;
