import React from 'react';
import AsideForm from '../../components/Aside/AsideForm';

const ViewConversationPage = () => {
    const dodam = [
        {
            dodam_circle: "./image/dodam_circle.png",
            text: "선재 배고파.",
        },
        {
            dodam_circle: "./image/dodam_circle.png",
            text: "선재 배불러.",
        },
        {
            dodam_circle: "./image/dodam_circle.png",
            text: "선재 졸려.",
        },
    ];

    const gaurdian = [
        { text: "선재야 냉장고에 돈까스 있으니까 전자레인지에 데워서 먼저 밥 먹어" },
        { text: "선재야 밥 맛있게 먹었어?" },
        { text: "선재야 엄마 좀 늦을거 같아서 먼저 씻고 자" },
    ];

    return (
        <div className='flex flex-col h-screen w-screen ml-[500px]'>
            <AsideForm/>
            <div className='relative left-1 top-28'>
                <div className='relative left-5 text-left text-2xl'>2024/03/14</div>
                {dodam.map((dodam, index) => (
                    <div key={index} className='flex m-5'>
                        <img className='w-28 h-[112px] z-10' src={dodam.dodam_circle} />
                        <div className='m-5 p-5 bg-white border-1 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e]'>{dodam.text}</div>
                    </div>
                ))}
                {gaurdian.map((gaurdian, index) => (
                    <div key={index} className='flex justify-end mr-64'>
                        <div className='m-5 p-5 bg-secondary border-2 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e]'>{gaurdian.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewConversationPage;