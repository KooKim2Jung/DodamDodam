import React, { useContext } from 'react';
import { FiXCircle } from "react-icons/fi";
import Modal from 'react-modal';
import { AppContext } from '../../../AppProvider';

const ConversationSummary = ({ summary, testSummary }) => {
    const { isSummaryOpen, setIsSummaryOpen, isHelpOpen, helpStep } = useContext(AppContext);

    const openModal = () => {
        setIsSummaryOpen(true);
    };

    const closeModal = () => {
        setIsSummaryOpen(false);
    };
    
    return (
        <div>
            <Modal 
                overlayClassName="fixed mt-20 z-40 inset-0 flex justify-center items-center" 
                isOpen={isSummaryOpen} 
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={false}
                className='flex flex-col items-center w-[500px] p-6 bg-primary rounded-[15px] shadow-[2px_4px_10px_#a5996e]'
            >
                <div className='flex justify-between w-full -mt-3 mb-3'>
                    <div className='text-2xl'>대화 요약</div>
                    <button className='hover:scale-110' onClick={closeModal}><FiXCircle size={30}/></button>
                </div>
                <div className='flex justify-center items-center p-4 rounded-[15px] h-auto text-2xl bg-white'>
                    {summary ? summary : (isHelpOpen && helpStep === 2 && testSummary.message)}
                </div>
            </Modal>
            <button className={`py-2 px-3 -mt-2 ${helpStep === 2 ? 'bg-primary px-3 rounded-[10px]' : ''}`} onClick={openModal}>대화 요약</button>
        </div>
    );
};

export default ConversationSummary;