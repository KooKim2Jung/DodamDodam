import React, { useState, useEffect, useContext } from 'react';
import HomeInformation from './HomeInformationModal/HomeInformation';
import { AppContext } from '../../../App';

const HomeInformationFolder = ({ folder, deleteFolder }) => {
    const { isEmojiSelected, setIsEmojiSelected } = useContext(AppContext);

    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const [newFolderEmoji, setNewFolderEmoji] = useState('');

    const openFolder = () => {
        setIsFolderOpen(true);
    }

    useEffect(() => {
        if (isEmojiSelected) {
            const savedEmojis = JSON.parse(localStorage.getItem('selectedEmojis')) || {};
            const folderEmoji = savedEmojis[folder.id];
            setNewFolderEmoji(folderEmoji);
        } setIsEmojiSelected(false);
    }, [isEmojiSelected, folder.id]);

    return (
        (folder && 
        <div className='flex mx-9'>
            <div>
                <div className='h-44 w-44 bg-tertiay rounded-[70px] flex items-center justify-center shadow-[2px_4px_1px_#a5996e] cursor-pointer'
                    onClick={openFolder}>
                    <div className='relative flex items-center justify-center z-1 text-7xl'>{newFolderEmoji}</div>
                </div>
            </div>
            <HomeInformation 
                isFolderOpen={isFolderOpen} 
                setIsFolderOpen={setIsFolderOpen} 
                folder={folder} 
                deleteFolder={deleteFolder}
            />
        </div>
        )
    );
};

export default HomeInformationFolder;