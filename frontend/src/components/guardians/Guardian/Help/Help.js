import React, { useContext, useEffect } from 'react';
import { FiXCircle, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import Modal from 'react-modal';
import HelpContents from './HelpContents';
import { AppContext } from '../../../../App';

const Help = ({ pageKey }) => {
    const { isHelpOpen, setIsHelpOpen, setIsCalendarOpen, 
    setIsSummaryOpen, helpStep, setHelpStep } = useContext(AppContext);

    const currentHelp = HelpContents[pageKey] ? HelpContents[pageKey][helpStep] : null;
    const title = currentHelp ? currentHelp.title : '';
    const description = currentHelp ? currentHelp.description : '';
    const howManySteps = HelpContents[pageKey] ? HelpContents[pageKey].length : 0;

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
        if (helpStep < howManySteps - 1) {
            setHelpStep((prevHelpStep) => prevHelpStep + 1);
        }
    }

    useEffect(() => {
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
                    <div className='text-2xl'>{title}</div>
                    <button className='hover:scale-110' onClick={closeHelp}><FiXCircle size={30}/></button>
                </div>
                <div className='flex justify-center items-center absolute top-16 bottom-16 left-6 right-6 px-2 rounded-[10px] text-2xl bg-white'>
                    {description}
                </div>
                <div className='flex right-5 bottom-4 absolute'>
                    <button className={`hover:scale-110 ${helpStep === 0 ? 'opacity-30' : ''}`} disabled={helpStep === 0} onClick={prevHelpStep}><FiArrowLeftCircle size={30}/></button>
                    <button className={`hover:scale-110 ${helpStep === howManySteps -1 ? 'opacity-30' : ''}`} disabled={helpStep === howManySteps - 1} onClick={nextHelpStep}><FiArrowRightCircle size={30}/></button>
                </div>
            </Modal>
            <button onClick={openHelp}>도움말</button>
        </div>
    );
};

export default Help;