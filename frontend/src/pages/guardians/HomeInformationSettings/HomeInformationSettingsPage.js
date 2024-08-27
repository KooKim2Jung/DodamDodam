import React, { useState, useContext } from 'react';
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import HomeInformationForm from '../../../components/guardians/HomeInformationSettings/HomeInformationModal/HomeInformationForm';
import Guardian from '../../../components/guardians/Guardian/Guardian';
import { AppContext } from '../../../AppContext';

const HomeInformationSettingsPage = () => {
    const { isGuardian, setIsGuardian, isWardSetting } = useContext(AppContext);

    const [items, setItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(null);

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
        <div className='flex flex-col h-screen w-screen pl-[240px] text-2xl'>
            <div className='pt-28 pl-5'>
                <h2 className='text-3xl text-left'>집 정보 설정</h2>
                <div className='grid grid-cols-1'>
                    <div className='absolute top-40 bottom-48 sm:bottom-48 md:bottom-40 lg:bottom-32 right-28 left-[360px] bg-tertiay rounded-[60px] shadow-[6px_4px_10px_#a5996e] pl-8 py-5 pr-7'>
                        <div className='overflow-y-auto h-full w-full'>
                        {items.map((item, index) => (
                            <>{isEditing && currentItemIndex === index ? (
                                <HomeInformationForm
                                    item={currentItem}
                                    saveItem={(newItem) => editItem(index, newItem)}
                                    editMode={true}
                                />) : (
                                <div className='items-center flex justify-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] ml-3 mr-5 my-4 px-2' 
                                key={index}>
                                    {item.content}
                                    <button onClick={() => handleEdit(index)} className='p-2 text-2xl rounded-[50px] border-2 mx-2 my-2 border-black hover:scale-110'><FiEdit2 /></button>
                                    <button onClick={() => deleteItem(index)} className='p-2 text-2xl rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
                                </div>
                            )}</>
                        ))}
                        </div>
                    </div>
                    <div className='absolute bottom-4 right-3 left-[260px]'>
                        <HomeInformationForm addItem={addItem}/>
                    </div>
                </div>
            </div>
            <Guardian isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>
        </div>
    );
};

export default HomeInformationSettingsPage;