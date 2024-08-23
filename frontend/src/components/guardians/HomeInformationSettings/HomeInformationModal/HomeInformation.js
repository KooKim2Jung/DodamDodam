import React, { useState } from 'react';
import Modal from 'react-modal';
import { FiX, FiTrash2, FiEdit2, FiSmile } from "react-icons/fi";
import HomeInformationForm from './HomeInformationForm';
import IconPicker from './IconPicker/IconPicker';

const HomeInformation = ({ isFolderOpen, setIsFolderOpen, folder, deleteFolder }) => {
    const [items, setItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(null);

    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

    const closeFolder = () => {
        setIsFolderOpen(false);
        setIsEditing(false);
    }

    const addItem = (item) => {
        setItems(prevData => [...prevData, item])
    }

    const editItem = (index, newItem) => {
        setItems(prevItems => prevItems.map((item, i) => i === index ? newItem : item));
        setIsEditing(false);
        setCurrentItem(null); 
        setCurrentItemIndex(null); 
    };

    const deleteItem = (index) => {
        setItems(prevData => prevData.filter((_, i) => i !== index))
    }

    const handleEdit = (index) => {
        setCurrentItem(items[index]);
        setCurrentItemIndex(index);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        closeFolder();
        deleteFolder(id);
    }

    const openIconPicker = () => {
        setIsIconPickerOpen(true);
    }

    return (
        <Modal
            overlayClassName='fixed mt-20 z-20 inset-0 flex justify-center items-center'
            isOpen={isFolderOpen}
            shouldCloseOnOverlayClick={false}
            className='w-[500px] h-[500px] relative flex-col justify-center bg-tertiay rounded-[80px] shadow-[4px_6px_2px_#a5996e]'
        >
        <div className='text-2xl absolute top-5 right-11'>
        <IconPicker isIconPickerOpen={isIconPickerOpen} setIsIconPickerOpen={setIsIconPickerOpen}/>
        <button className='p-2 mr-2 rounded-[50px] border-2 border-black hover:scale-110' onClick={openIconPicker}><FiSmile /></button>
            <button className='p-2 mr-2 rounded-[50px] border-2 border-black hover:scale-110' onClick={() => handleDelete(folder.id)}><FiTrash2 /></button>
            <button className='p-2 rounded-[50px] border-2 border-black hover:scale-110' onClick={closeFolder}><FiX /></button>
        </div>
        <div className='absolute top-14 left-5 right-5 text-2xl'>
        {items.map((item, index) => (
            <>{isEditing && currentItemIndex === index ? 
                <div className='mt-5 py-2'><HomeInformationForm
                    item={currentItem}
                    saveItem={(newItem) => editItem(index, newItem)}
                    editMode={true}
                /></div> :
                <div className='items-center flex justify-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] my-5' 
                key={index}>{item.content}
                <button onClick={() => handleEdit(index)} className='p-2 text-2xl rounded-[50px] border-2 mx-2 my-3 border-black hover:scale-110'><FiEdit2 /></button>
                <button onClick={() => deleteItem(index)} className='p-2 text-2xl rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
            </div>
            }</>
        ))}
        </div>
        <div className='absolute bottom-5 right-5 left-7 text-2xl'>
            <HomeInformationForm addItem={addItem}/>
        </div>
        </Modal>
    );
};

export default HomeInformation;