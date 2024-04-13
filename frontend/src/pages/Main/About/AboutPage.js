import React from 'react';
import FooterForm from '../../../components/Footer/FooterForm';

const features = [
    {
        title: "감정 분석",
        description: "대화내용을 분석해서 감정 상태를 알려줘요.",
        image: "./image/love.png",
        alt: "Love Image"
    },
    {
        title: "대화 요약",
        description: "대화의 중요한 내용을 요약해서 알려줘요.",
        image: "./image/speechbubble.png",
        alt: "Speech Bubble Image"
    },
    {
        title: "스케줄링",
        description: "피보호자의 스케줄을 설정하면 시간에 맞춰서 알려줘요.",
        image: "./image/clock.png",
        alt: "Clock Image"
    },
    {
        title: "맞춤 설정",
        description: "피보호자의 정보를 " + "\n" + "입력해서 맞춤 서비스를 제공받을 수 있어요.",
        image: "./image/setting.png",
        alt: "Setting Image"
    }
];

const AboutPage = () => {
    return (
        <div>
            <div className='inline-flex relative top-[50px] -left-[320px]'>
                <h2 className='text-basic-size'>도담도담</h2>
                <h3 className='items-baseline relative top-4 left-1 text-2xl'>: 어린아이가 탈 없이 잘 자라는 모양</h3>
            </div>
            <div className='relative flex flex-wrap mt-[70px] px-40'>
                {features.map((feature, index) => (
                    <div key={index}>
                        {index === 2 || index === 3 ? (
                            <div className='flex flex-row relative left-28'>
                                <div className="w-[200px] pt-[30px]">
                                    <h2 className='mb-[5px] text-3xl'>{feature.title}</h2>
                                    <div className='text-2xl'>{feature.description.split('\n').map((box, idx) => (
                                        <React.Fragment key={idx}>
                                            {box}<br/>
                                        </React.Fragment>
                                    ))}
                                    </div>
                                </div>
                                <img className="w-[190px] h-[190px] mb-8 mr-6 ml-3" src="./image/star.png"/>
                                <img className="absolute top-16 left-[267px] w-[80px] h-[80px] z-1" src={feature.image} alt={feature.alt}/>
                            </div>
                        ) : (
                            <div className='flex flex-row relative'>
                                <img className="w-[190px] h-[190px] mb-8 mr-6 ml-3" src="./image/star.png"/>
                                <img className="absolute top-16 left-[68px] w-[80px] h-[80px] z-1" src={feature.image} alt={feature.alt}/>
                                <div className="w-[200px] pt-[30px]">
                                    <h2 className='mb-[5px] text-3xl'>{feature.title}</h2>
                                    <div className='text-2xl'>{feature.description.split('\n').map((box, idx) => (
                                        <React.Fragment key={idx}>
                                            {box}<br/>
                                        </React.Fragment>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <FooterForm/>
        </div>
    );
};


export default AboutPage;
