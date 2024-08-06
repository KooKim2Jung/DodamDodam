import React from 'react';

const HomeInformationFolder = ({ showFolder }) => {
    return (
        (showFolder && 
        <div className='h-44 w-44 mx-5 mb-20 bg-tertiay rounded-[70px] flex items-center justify-center shadow-[3px_5px_2px_#a5996e]'>
        </div>)
    );
};

export default HomeInformationFolder;