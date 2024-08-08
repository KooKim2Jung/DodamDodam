import React, { useState } from 'react';
import Modal from 'react-modal';
import { FiX, FiTrash2 } from "react-icons/fi";

const HomeInformation = ({ isOpen, setIsOpen }) => {

    const [data, setData] = useState({});

    const closeModal = () => {
        setIsOpen(false);
    }

    const inputData = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name] : value
        }))
    }

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
        <div className='absolute bottom-5 right-5 left-5 text-2xl flex justify-center'>
            <input className='w-[350px] py-2 px-3 mr-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                type='text'
                onChange={inputData}
            />
            <button  className='p-2 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110'>추가</button>
        </div>
        </Modal>
    );
};

export default HomeInformation;