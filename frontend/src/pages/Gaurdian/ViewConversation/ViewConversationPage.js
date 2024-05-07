import React from 'react';
import AsideForm from '../../../components/Aside/AsideForm';

const ViewConversationPage = () => {
    const dodam = [
        {
            dodam_circle: "./image/dodam_circle.png",
            text: "선재야 배 안고파?.",
        },
        {
            dodam_circle: "./image/dodam_circle.png",
            text: "선재야 엄마가 밥 먹으래.",
        },
        {
            dodam_circle: "./image/dodam_circle.png",
            text: "선재야 엄마가 먼저 자래.",
        },
    ];

    const ward = [
        { text: "도담아 나 심심해" },
        { text: "도담아 놀자" },
        { text: "도담아 엄마 안와?" },
    ];

    return (
        <div className='flex flex-col h-screen w-screen pl-[240px]'>
            <AsideForm/>
            <div className='pt-28 pl-5'>
                <div className='mb-3 text-left text-2xl'>2024/03/14</div>
                {dodam.map((dodam, index) => (
                    <div key={index} className='flex mb-2 items-center'>
                        <img className='w-[90px] h-[95px] z-10' src={dodam.dodam_circle} />
                        <div className='m-5 p-5 bg-white border-1 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e]'>{dodam.text}</div>
                    </div>
                ))}
                {ward.map((ward, index) => (
                    <div key={index} className='flex justify-end'>
                        <div className='m-5 p-5 bg-secondary border-2 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e]'>{ward.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewConversationPage;