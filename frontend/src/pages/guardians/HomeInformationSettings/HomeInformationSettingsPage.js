import React, { useState, useContext } from 'react';
import Aside from '../../../components/section/Aside/Aside';
import { AppContext } from '../../../App';
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import HomeInformationForm from '../../../components/guardians/HomeInformationSettings/HomeInformationModal/HomeInformationForm';
import Guardian from '../../../components/guardians/Guardian/Guardian';

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
        <div className='text-3xl w-screen'>
            <Aside/>
            <h2 className='absolute top-28 left-[265px]'>집 정보 설정</h2>
            <div className='flex justify-center pl-60 mt-36'>
                <div className='relative flex items-center justify-center w-[700px] h-[450px]'>
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
                    <div className='absolute bottom-5 text-2xl'>
                        <HomeInformationForm addItem={addItem}/>
                    </div>
                </div>
            </div>
            <Guardian isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>
        </div>
    );
};

export default HomeInformationSettingsPage;