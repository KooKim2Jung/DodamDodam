import React from 'react';

const HomeInformationFolder = ({ folder }) => {
    return (
        (folder && 
        <div className='flex mx-9'>
            <div className='h-44 w-44 bg-tertiay rounded-[70px] flex items-center justify-center shadow-[2px_4px_1px_#a5996e]'></div>
        </div>
        )
    );
};

export default HomeInformationFolder;