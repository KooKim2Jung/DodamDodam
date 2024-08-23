import React, { useState } from 'react';
import HomeInformation from './HomeInformationModal/HomeInformation';

const HomeInformationFolder = ({ folder, deleteFolder }) => {
    const [isFolderOpen, setIsFolderOpen] = useState(false);

    const openFolder = () => {
        setIsFolderOpen(true);
    }

    return (
        (folder && 
        <div className='flex mx-9'>
            <div className='h-44 w-44 bg-tertiay rounded-[70px] flex items-center justify-center shadow-[2px_4px_1px_#a5996e] cursor-pointer'
                onClick={openFolder}>
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