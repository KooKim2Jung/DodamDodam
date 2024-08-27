import React, { useContext, useState } from 'react';
import { FiX, FiSmile } from "react-icons/fi";
import Modal from 'react-modal';
import EmojiPicker from 'emoji-picker-react';
import { AppContext } from '../../../../../AppContext';

const IconPicker = ({ folder }) => {
    const { setIsEmojiSelected } = useContext(AppContext);

    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

    const openIconPicker = () => {
        setIsIconPickerOpen(true);
    }

    const closeIconPicker = () => {
        setIsIconPickerOpen(false);
    }

    const handleEmojiClick = (e, folderId) => {
        const selectedEmojis = JSON.parse(localStorage.getItem('selectedEmojis')) || {};
        selectedEmojis[folderId] = e.emoji;
        localStorage.setItem('selectedEmojis', JSON.stringify(selectedEmojis));
        setIsEmojiSelected(true);
        closeIconPicker();
    }

    return (
        <div>
            <Modal
                overlayClassName='fixed top-20 left-36 z-20 inset-0 flex justify-center items-center'
                isOpen={isIconPickerOpen}
                className='relative flex-col justify-center bg-primary rounded-[40px] shadow-[4px_6px_2px_#a5996e]'
            >
            <div className='flex justify-end mt-3 mr-6'>
                <button className='w-8 h-8 bg-primary border-2 text-2xl items-center 
                justify-center flex rounded-[50px] border-white hover:scale-110' onClick={closeIconPicker}><FiX /></button>
            </div>
            <div className='mx-5 mt-2 mb-5'>
                <EmojiPicker 
                    emojiStyle='native' 
                    searchDisabled={true} 
                    autoFocusSearch={false} 
                    previewConfig={{ showPreview: false }} 
                    width={300} height={300}
                    onEmojiClick={(e) => handleEmojiClick(e, folder.id)}
                />
            </div>
            </Modal>
            <button className='p-2 mr-2 rounded-[50px] border-2 border-black hover:scale-110' onClick={openIconPicker}><FiSmile /></button>
        </div>
    );
};

export default IconPicker;