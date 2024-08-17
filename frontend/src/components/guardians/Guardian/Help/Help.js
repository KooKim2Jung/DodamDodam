import React, { useContext } from 'react';
import { FiX } from "react-icons/fi";
import Modal from 'react-modal';
import { AppContext } from '../../../../App';

const Help = () => {
    const { isHelpOpen, setIsHelpOpen } = useContext(AppContext);

    const openHelp = () => {
        setIsHelpOpen(true);
    }

    const closeHelp = () => {
        setIsHelpOpen(false);
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
                <div className='flex'>
                    <button className='w-8 h-8 bg-primary border-2 text-2xl items-center 
                    justify-center flex rounded-[50px] border-white hover:scale-110' onClick={closeHelp}><FiX /></button>
                </div>
            </div>
            </Modal>
            <button onClick={openHelp}>도움말</button>
        </div>
    );
};

export default Help;