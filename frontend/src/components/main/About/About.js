import React from 'react';

const abouts = [
    {
        title: "대화 요약",
        description: "대화의 중요한 내용을 요약해서 알려줘요.",
        image: "./images/speechbubble.png",
    },
    {
        title: "감정 분석",
        description: "대화 내용을 분석해서 감정 상태를 알려줘요.",
        image: "./images/love.png",
    },
    {
        title: "스케줄링",
        description: "피보호자의 스케줄을 설정하면 시간에 맞춰서 알려줘요.",
        image: "./images/clock.png",
    },
    {
        title: "집 정보 설정",
        description: "집안의 주요 정보를 입력하여 맞춤형 서비스를 받아보세요.",
        image: "./images/memo.png",
    },
    {
        title: "맞춤 설정",
        description: "피보호자의 정보를 입력하여 맞춤형 서비스를 받아보세요.",
        image: "./images/setting.png",
    }
];

const About = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen pt-[60px] md:pt-[100px] w-screen'>
            <div className='hidden sm:flex md:pt-8 items-center absolute left-10 top-20 z-10'>
                <h2 className='text-[6vh] mr-2'>도담도담</h2>
                <h3 className='text-[3.5vh]'>: 어린아이가 탈 없이 잘 자라는 모양</h3>
            </div>
            <div className='grid grid-cols-2 gap-10 lg:-mb-9 lg:gap-28 transition-all duration-300'>
                {abouts.slice(0,2).map((about, index) => (
                    <div key={index}>
                        <div className='w-[20vh] md:w-[50vh] lg:w-[24vh] md:flex md:items-center lg:grid'>
                            <div className='relative z-0'>
                                <img className='h-[20vh] w-[20vh] md:h-[24vh] md:w-[40vh] lg:h-[24vh] lg:w-[24vh]' src='./images/star.png' alt='노란색 별'/>
                                <img className='h-[9vh] w-[9vh] md:h-[10vh] md:w-[10vh] mt-[2vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src={about.image} alt='기능별 사진'/>
                            </div>
                            <div className='relative -mt-[2vh] md:-mt-[4vh] z-1'>
                                <div className='text-[4vh] md:text-[4vh]'>{about.title}</div>
                                <div className='text-[3vh] hidden md:block'>{about.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-3 gap-10 md:gap-28 transition-all duration-300'>
                {abouts.slice(2,5).map((about, index) => (
                    <div key={index}>
                        <div className='w-[20vh] md:w-[24vh]'>
                            <div className='relative'>
                                <img className='h-[20vh] w-[20vh] md:h-[24vh] md:w-[24vh]' src='./images/star.png' alt='노란색 별'/>
                                <img className='h-[9vh] w-[9vh] md:h-[10vh] md:w-[10vh] mt-[1vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src={about.image} alt='기능별 사진'/>
                            </div>
                            <div className='relative -mt-[2vh] md:-mt-[4vh] z-1'>
                                <div className='text-[4vh] md:text-[4vh]'>{about.title}</div>
                                <div className='text-[3vh] hidden md:block'>{about.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default About;