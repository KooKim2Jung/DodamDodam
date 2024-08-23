import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FiEdit2, FiCheck } from "react-icons/fi";
import HomeInformationFolder from './HomeInformationFolder';

const HomeInformationBoard = () => {
    const [folders, setFolders] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentFolderId, setCurrentFolderId] = useState(null);

    const showFolder = () => {
        if (folders.length < 8) {
            setFolders([...folders, { id: Date.now(), name: '새폴더' }]);
        }
    }

    const changeNameFolder = (id) => {
        setIsEdit(true);
        setCurrentFolderId(id);
    }

    const unChangeNameFolder = () => {
        setIsEdit(false);
        setCurrentFolderId(null);
    }

    const inputChange = (e) => {
        setFolders(folders.map(folder =>
            folder.id === currentFolderId ? { ...folder, name: e.target.value } : folder
        ));
    }

    const deleteFolder = (deleteId) => {
        setFolders(folders => folders.filter(folder => folder.id !== deleteId));
    }

    return (
        <div className='grid grid-cols-4'>
            {folders.map((folder) => (
                <div key={folder.id}>
                    <HomeInformationFolder folder={folder} deleteFolder={deleteFolder}/>
                    {isEdit && currentFolderId === folder.id ? (
                        <div className='flex items-center mt-3.5 ml-5'>
                            <input 
                                className='w-44 py-1 text-center focus:border-white border-transparent border-2 outline-none bg-secondary rounded-[50px]'
                                type='text' 
                                value={folder.name} 
                                onChange={inputChange} 
                             />
                            <div className='p-2 ml-3 text-xl w-10 h-10 bg-secondary rounded-[50px] border-2 border-secondary focus:border-white shadow-custom1 hover:scale-110 transition-transform cursor-pointer' 
                            onClick={unChangeNameFolder}><FiCheck /></div>
                        </div>
                    ) : (
                        <div className='w-full border-transparent border-2 cursor-pointer flex justify-center items-center group pl-[56px]' 
                            onClick={() => changeNameFolder(folder.id)}>
                            {folder.name}
                            <div className='invisible group-hover:visible transition-transform p-2 text-xl rounded-[50px] border-2 mx-2 my-4 border-black hover:scale-110'><FiEdit2 /></div>
                        </div>
                    )}
                </div>
            ))}
            {folders.length < 8 && (
                <div className='h-44 w-44 mx-9 mb-[75px] bg-tertiay shadow-[2px_4px_1px_#a5996e] rounded-[70px] flex items-center justify-center'>
                    <FaPlus size={54} className='hover:scale-110 cursor-pointer' onClick={showFolder} />
                </div>
            )}
        </div>
    );
};

export default HomeInformationBoard;