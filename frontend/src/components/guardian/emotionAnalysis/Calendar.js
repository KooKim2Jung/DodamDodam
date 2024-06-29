import React, { useState } from 'react';
import Modal from 'react-modal';

const Calender = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <Modal 
                overlayClassName="fixed mt-20 z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center" 
                isOpen={isOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={false}
                className='w-[500px] h-[440px] bg-primary rounded-[10px]'
            >
                <div className='flex justify-center items-center mt-3'>
                    <div className='rounded-[10px] w-[450px] h-[300px] bg-white border-black border-2'></div>
                </div>
                <div className='justify-center items-end mt-4 mb-3'>
                    <button className='text-3xl border-2 px-7 py-2 rounded-[10px] border-black' onClick={closeModal}>확인</button>
                </div>
            </Modal>
            <button onClick={openModal}>날짜 선택</button>
        </div>
    );
};

export default Calender;