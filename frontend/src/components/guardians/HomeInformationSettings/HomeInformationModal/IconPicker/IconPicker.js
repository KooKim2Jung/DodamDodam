import React, { useState } from 'react';
import { FiX, FiSmile } from "react-icons/fi";
import Modal from 'react-modal';
import EmojiPicker from 'emoji-picker-react';

const IconPicker = () => {
    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

    const openIconPicker = () => {
        setIsIconPickerOpen(true);
    }

    const closeIconPicker = () => {
        setIsIconPickerOpen(false);
    }

    return (
        <div>
            <Modal
                overlayClassName='fixed -top-20 left-36 z-20 inset-0 flex justify-center items-center'
                isOpen={isIconPickerOpen}
                className='w-[200px] h-[200px] relative flex-col justify-center bg-primary rounded-[60px] shadow-[4px_6px_2px_#a5996e]'
            >
            <div><EmojiPicker/></div>
            <div className='flex justify-end mt-3 mr-6'>
                <button className='w-8 h-8 bg-primary border-2 text-2xl items-center 
                justify-center flex rounded-[50px] border-white hover:scale-110' onClick={closeIconPicker}><FiX /></button>
            </div>
            </Modal>
            <button className='p-2 mr-2 rounded-[50px] border-2 border-black hover:scale-110' onClick={openIconPicker}><FiSmile /></button>
        </div>
    );
};

export default IconPicker;