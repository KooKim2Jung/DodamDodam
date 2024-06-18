import React, { useState } from 'react';
import Modal from 'react-modal';

const ConversationSummary = ({ summary }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    
    return (
        <div>
            <Modal 
                overlayClassName="fixed mt-20 z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center" 
                isOpen={isOpen} 
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={false}
                className='w-[500px] bg-primary rounded-[10px] border-2 border-black'
            >
                <div className='my-2 ml-7 text-left text-2xl'>대화요약</div>
                <div className='flex justify-center items-center mt-3'>
                    <div className='flex justify-center items-center rounded-[10px] w-[450px] h-[300px] text-2xl bg-white border-black border-2'>{summary}</div>
                </div>
                <div className='justify-center items-end my-5'>
                    <button className='text-3xl border-2 px-7 py-2 rounded-[10px] border-black' onClick={closeModal}>확인</button>
                </div>
            </Modal>
            <button onClick={openModal}>대화요약 보기</button>
        </div>
    );
};

export default ConversationSummary;