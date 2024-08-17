import React, { useState, useContext } from 'react';
import { FiXCircle, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import Modal from 'react-modal';
import { AppContext } from '../../../../App';

const Help = () => {
    const { isHelpOpen, setIsHelpOpen, setIsCalendarOpen } = useContext(AppContext);

    const [helpStep, setHelpStep] = useState(0);

    const openHelp = () => {
        setIsHelpOpen(true);
        setIsCalendarOpen(true);
    }

    const closeHelp = () => {
        setIsHelpOpen(false);
    }

    const prevHelpStep = () => {
        setHelpStep((prevHelpStep) => prevHelpStep > 0 ? prevHelpStep - 1 : 0);
    }

    const nextHelpStep = () => {
        setHelpStep((prevHelpStep) => prevHelpStep + 1);
    }

    return (
        <div>
            <Modal
            overlayClassName='fixed flex z-30 justify-center items-center inset-0 bg-transcript outline-none'
            isOpen={isHelpOpen} 
            onRequestClose={closeHelp}
            shouldCloseOnOverlayClick={false}
            className='relative outline-none w-[400px] h-[280px] z-50 pb-6 flex shadow-[6px_5px_10px_#a5996e] justify-center items-center bg-primary rounded-[15px]'
        >
            <div className='flex justify-between w-full top-0 absolute py-4 px-5'>
                <div className='text-2xl'>설명서</div>
                <button className='hover:scale-110' onClick={closeHelp}><FiXCircle size={30}/></button>
            </div>
            <div className='flex justify-center items-center absolute top-16 bottom-16 left-6 right-6 px-2 rounded-[10px] text-2xl bg-white'>
                {helpStep === 0 && <div>도담이와의 대화 내용을 확인할 수 있습니다. 원하는 날짜를 선택하세요.</div>}
                {helpStep === 1 && <div>도담이와 나눈 대화 내용을 확인해 보세요.</div>}
                {helpStep === 2 && <div>도담이와의 대화를 요약하여 볼 수 있습니다.</div>}
            </div>
            <div className='flex right-5 bottom-4 absolute'>
                <button className='hover:scale-110' onClick={prevHelpStep}><FiArrowLeftCircle size={30}/></button>
                <button className='hover:scale-110' onClick={nextHelpStep}><FiArrowRightCircle size={30}/></button>
            </div>
            </Modal>
            <button onClick={openHelp}>도움말</button>
        </div>
    );
};

export default Help;