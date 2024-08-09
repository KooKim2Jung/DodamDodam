import React, { useState } from 'react';
import Modal from 'react-modal';
import { FiX, FiTrash2, FiEdit2 } from "react-icons/fi";
import HomeInformationForm from './HomeInformationForm';

const HomeInformation = ({ isOpen, setIsOpen }) => {
    const [items, setItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
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

    return (
        <Modal
            overlayClassName='fixed mt-20 z-20 inset-0 flex justify-center items-center'
            isOpen={isOpen}
            shouldCloseOnOverlayClick={false}
            className='w-[500px] h-[500px] relative flex-col justify-center bg-tertiay rounded-[80px] shadow-[4px_6px_2px_#a5996e]'
        >
        <div className='text-2xl absolute top-5 right-14'>
            <button className='p-2 mr-2 rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
            <button className='p-2 rounded-[50px] border-2 border-black hover:scale-110' onClick={closeModal}><FiX /></button>
        </div>
        <div className='absolute top-14 left-5 right-5 text-2xl'>
        {items.map((item, index) => (
            <div>{isEditing && currentItemIndex === index ? 
                <HomeInformationForm
                    item={currentItem}
                    saveItem={(newItem) => editItem(index, newItem)}
                    editMode={true}
                /> :
                <div className='items-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] my-6' 
                key={index}>{item.content}
                <button onClick={() => handleEdit(index)} className='p-2 text-2xl rounded-[50px] border-2 mx-2 my-3 border-black hover:scale-110'><FiEdit2 /></button>
                <button onClick={() => deleteItem(index)} className='p-2 text-2xl rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
            </div>
            }</div>
        ))}
        </div>
        <div className='absolute bottom-5 right-5 left-5 text-2xl flex justify-center'>
            <HomeInformationForm addItem={addItem}/>
        </div>
        </Modal>
    );
};

export default HomeInformation;