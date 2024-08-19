import React, { useContext } from 'react';
import Modal from 'react-modal';
import { AppContext } from '../../../App';

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
                className='w-[500px] bg-primary rounded-[10px] shadow-[2px_4px_10px_#a5996e]'
            >
                <div className='my-2 ml-7 text-left text-2xl'>대화 요약</div>
                <div className='flex justify-center items-center mt-3'>
                    <div className='flex justify-center items-center px-5 py-2 rounded-[10px] w-[440px] h-[300px] text-2xl bg-white '>
                        {summary ? summary : (isHelpOpen && helpStep === 2 && testSummary.message)}
                    </div>
                </div>
                <div className='justify-center items-end my-5'>
                    <button className='text-3xl border-2 px-7 py-2 rounded-[10px] border-white hover:scale-110' onClick={closeModal}>확인</button>
                </div>
            </Modal>
            <button className={`py-2 px-3 -mt-2 ${helpStep === 2 ? 'bg-primary px-3 rounded-[10px]' : ''}`} onClick={openModal}>대화 요약</button>
        </div>
    );
};

export default ConversationSummary;