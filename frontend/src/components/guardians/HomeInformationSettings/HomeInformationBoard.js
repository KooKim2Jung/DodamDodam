import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import HomeInformationFolder from './HomeInformationFolder';

const HomeInformationBoard = () => {
    const [folders, setFolders] = useState([]);

    const handleShowFolder = () => {
        if (folders.length < 7) {
            setFolders([...folders, true]);
        }
        else {
            alert('폴더 최대 개수를 초과하였습니다.')
        }
    }

    return (
        <div className='grid grid-cols-4'>
            {folders.map((showFolder, index) => (
                <HomeInformationFolder key={index} showFolder={showFolder} />
            ))}
            <div className='h-44 w-44 mb-20 mx-5 bg-tertiay rounded-[70px] flex items-center justify-center'>
                <FaPlus size={54} className='hover:scale-110 cursor-pointer' onClick={handleShowFolder} />
            </div>
        </div>
    );
};

export default HomeInformationBoard;
