import React from 'react';

const features = [
    {
        title: "감정 분석",
        description: "대화내용을 분석해서 감정 상태를 알려줘요.",
        image: "./images/love.png",
    },
    {
        title: "대화 요약",
        description: "대화의 중요한 내용을 요약해서 알려줘요.",
        image: "./images/speechbubble.png",
    },
    {
        title: "스케줄링",
        description: "피보호자의 스케줄을 설정하면 시간에 맞춰서 알려줘요.",
        image: "./images/clock.png",
    },
    {
        title: "맞춤 설정",
        description: "피보호자의 정보를 " + "\n" + "입력해서 맞춤 서비스를 제공받을 수 있어요.",
        image: "./images/setting.png",
    }
];

const About = () => {
    return (
        <div className='h-screen w-screen pt-20 bg-primary justify-center flex'>
            <div className='flex absolute top-[130px] left-[200px]'>
                <h2 className='md:text-basic-size text-2xl md:block hidden'>도담도담</h2>
                <h3 className='md:text-2xl mt-1 ml-1 text-xl md:block hidden'>: 어린아이가 탈 없이 잘 자라는 모양</h3>
            </div>
            <div className='absolute top-[200px] bg-transparent w-full md:w-[900px] flex flex-row flex-wrap items-center md:items-start justify-center'>
                {features.map((features, index) => (
                    <div key={index}>
                        {index === 2 || index === 3 ? (
                            <div className='flex flex-row relative md:left-28'>
                                <div className="w-[200px] pt-[30px]">
                                    <h2 className='mb-[5px] text-3xl'>{features.title}</h2>
                                    <div className='text-2xl md:block hidden'>{features.description.split('\n').map((box, index) => (
                                        <div key={index}>
                                            {box}<br/>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                <img className="w-[110px] h-[110px] md:w-[190px] md:h-[190px] mb-8 md:mr-6 md:ml-3" src="./images/star.png"/>
                                <img className="absolute md:top-16 top-[36px] md:left-[267px] left-[230px] h-[50px] w-[50px] md:w-[80px] md:h-[80px] z-1" src={features.image} />
                            </div>
                        ) : (
                            <div className='flex flex-row relative'>
                                <img className="w-[110px] h-[110px] md:w-[190px] md:h-[190px] mb-8 md:mr-6 md:ml-3" src="./images/star.png"/>
                                <img className="absolute md:top-16 top-[36px] md:left-[68px] left-[30px] h-[50px] w-[50px] md:w-[80px] md:h-[80px] z-1" src={features.image} />
                                <div className="w-[200px] pt-[30px]">
                                    <h2 className='mb-[5px] text-3xl'>{features.title}</h2>
                                    <div className='text-2xl md:block hidden'>{features.description.split('\n').map((box, index) => (
                                        <div key={index}>
                                            {box}<br/>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default About;