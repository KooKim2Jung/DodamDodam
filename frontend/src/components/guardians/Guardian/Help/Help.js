import React, { useContext, useEffect } from 'react';
import { FiXCircle, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import Modal from 'react-modal';
import { AppContext } from '../../../../App';

const Help = () => {
    const { isHelpOpen, setIsHelpOpen, setIsCalendarOpen, 
    setIsSummaryOpen, helpStep, setHelpStep, howManySteps } = useContext(AppContext);

    const openHelp = () => {
        setIsHelpOpen(true);
        setIsCalendarOpen(true);
    }

    const closeHelp = () => {
        setIsHelpOpen(false);
        setIsCalendarOpen(false);
        setHelpStep(0);
    }

    const prevHelpStep = () => {
        setHelpStep((prevHelpStep) => prevHelpStep > 0 ? prevHelpStep - 1 : 0);
    }

    const nextHelpStep = () => {
        if (howManySteps > helpStep) {
            setHelpStep((prevHelpStep) => prevHelpStep + 1);
        }
    }

    useEffect(() => {
        console.log(howManySteps);
        if (helpStep === 0 && isHelpOpen) {
            setIsCalendarOpen(true);
        } 
        else if (helpStep === 2) {
            setIsSummaryOpen(true);
        }
        else {
            setIsCalendarOpen(false);
            setIsSummaryOpen(false);
        }
    }, [helpStep])

    const getHelpPosition = () => {
        switch (helpStep) {
            case 0:
                return { bottom: '6%', right: '32%' };
            case 1:
                return {};
            case 2:
                return { bottom: '8%', left: '32%' };
            default:
        }
    }

    return (
        <div>
            <Modal
            overlayClassName='fixed flex z-[1000] justify-center items-center inset-0 outline-none'
            isOpen={isHelpOpen} 
            onRequestClose={closeHelp}
            shouldCloseOnOverlayClick={false}
            style={{content : getHelpPosition()}}
            className='relative outline-none w-[400px] h-[280px] flex shadow-[6px_5px_10px_#a5996e] justify-center items-center bg-primary rounded-[15px]'
            >
                <div className='flex justify-between w-full top-0 absolute py-4 px-5'>
                    <div className='text-2xl'>
                        {helpStep === 0 && <div>날짜 선택</div>}
                        {helpStep === 1 && <div>대화 내용</div>}
                        {helpStep === 2 && <div>대화요약 보기</div>}
                    </div>
                    <button className='hover:scale-110' onClick={closeHelp}><FiXCircle size={30}/></button>
                </div>
                <div className='flex justify-center items-center absolute top-16 bottom-16 left-6 right-6 px-2 rounded-[10px] text-2xl bg-white'>
                    {helpStep === 0 && <div>도담이와의 대화 내용을 확인할 수 있습니다. 원하는 날짜를 선택하세요.</div>}
                    {helpStep === 1 && <div>도담이와 나눈 대화 내용을 확인해 보세요.</div>}
                    {helpStep === 2 && <div>도담이와의 대화를 요약하여 볼 수 있습니다.</div>}
                </div>
                <div className='flex right-5 bottom-4 absolute'>
                    <button className={`hover:scale-110 ${helpStep === 0 ? 'opacity-30' : ''}`} disabled={helpStep === 0} onClick={prevHelpStep}><FiArrowLeftCircle size={30}/></button>
                    <button className={`hover:scale-110 ${helpStep === howManySteps ? 'opacity-30' : ''}`} disabled={helpStep === howManySteps} onClick={nextHelpStep}><FiArrowRightCircle size={30}/></button>
                </div>
            </Modal>
            <button onClick={openHelp}>도움말</button>
        </div>
    );
};

export default Help;