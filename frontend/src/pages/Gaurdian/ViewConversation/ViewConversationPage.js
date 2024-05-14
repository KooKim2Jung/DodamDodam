import React, { useState } from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import Modal from 'react-modal'

const ViewConversationPage = () => {
    const [isOpen, setIsOpen] = useState();

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

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

    let date = new Date().toISOString().split('T')[0];

    return (
        <div className='flex flex-col h-screen w-screen pl-[240px]'>
            <AsideForm/>
            <div className='pt-28 pl-5'>
                <div className='flex justify-end relative -left-3 text-2xl'><button onClick={openModal}>대화요약 보기</button></div>
                <Modal 
                    overlayClassName="fixed mt-20 z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center" 
                    isOpen={isOpen} onRequestClose={() => closeModal}
                    className='w-[500px] h-[440px] bg-primary rounded-[10px]'
                    >
                    <div className='mt-2 mb-2 ml-7 text-left text-2xl'>{date} 대화요약</div>
                    <div className='flex justify-center items-center mt-3'>
                        <div className='rounded-[10px] w-[450px] h-[300px] bg-white border-black border-2'></div>
                    </div>
                    <div className='justify-center items-end mt-4 mb-3'>
                        <button className='text-3xl border-2 px-7 py-2 rounded-[10px] border-black' onClick={closeModal}>확인</button>
                    </div>
                </Modal>
                <div className='mb-3 text-left text-2xl'>{date}</div>
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