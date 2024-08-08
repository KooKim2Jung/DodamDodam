import React, { useState } from 'react';
import HomeInformation from './HomeInformation';

const HomeInformationFolder = ({ folder }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    return (
        (folder && 
        <div className='flex mx-9'>
            <div className='h-44 w-44 bg-tertiay rounded-[70px] flex items-center justify-center shadow-[2px_4px_1px_#a5996e] cursor-pointer'
                onClick={openModal}>
            </div>
            <HomeInformation isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
        )
    );
};

export default HomeInformationFolder;