import React, { useContext, useState } from 'react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Aside from '../../../components/section/Aside/Aside';
import ScheduleForm from '../../../components/guardians/Schedule/ScheduleForm';
import Guardian from '../../../components/guardians/Guardian/Guardian';
import { AppContext } from '../../../App';

const SchedulePage = () => {
    const { isGuardian, setIsGuardian, isWardSetting, isHelpOpen, helpStep } = useContext(AppContext);
    
    const [items, setItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(null);

    const testSchedule = {
        testDate: '2024-01-01',
        testTime: '15:40',
        testRepeat: '월,수,금',
        testNote: '수학 학원 가기'
    }

    const addItem = (item) => {
        setItems(prevItems => [...prevItems, item]);
    };

    const editItem = (index, newItem) => {
        setItems(prevItems => prevItems.map((item, i) => i === index ? newItem : item));
        setIsEditing(false);
        setCurrentItem(null); 
        setCurrentItemIndex(null); 
    };

    const deleteItem = (index) => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const handleEdit = (index) => {
        setCurrentItem(items[index]);
        setCurrentItemIndex(index);
        setIsEditing(true);
    };

    return (
        <div className='flex flex-col h-screen w-screen pl-[240px]'>
            <Aside />
            <div className={`mt-32 text-3xl ${isHelpOpen && helpStep === 0 ? 'bg-white z-40 rounded-[10px]' : ''}`}>
                <div className='grid grid-cols-5 mb-5'>
                    <h2>날짜</h2>
                    <h2>시간</h2>
                    <h2>반복</h2>
                    <h2 className='col-span-2'>내용</h2>
                </div>
                <ScheduleForm addItem={addItem} />
            </div>
            {isHelpOpen ? (<>
                {helpStep === 1 ? (
                    <div className='grid grid-cols-5 text-2xl z-40 items-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] mx-2'>
                        <div>{testSchedule.testDate}</div>
                        <div>{testSchedule.testTime}</div>
                        <div>{testSchedule.testRepeat}</div>
                        <div className='flex col-span-2 items-center justify-center'>
                            <div>{testSchedule.testNote}</div>
                            <button className='p-2 text-2xl rounded-[50px] border-2 mx-2 my-3 border-black hover:scale-110'><FiEdit2 /></button>
                            <button className='p-2 text-2xl rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
                        </div>
                    </div>
                ) : null}
            </>) : (<>
                {items.map((item, index) => (
                    <div key={index} className='text-2xl m-1'>
                        {isEditing && currentItemIndex === index ?
                            <ScheduleForm 
                                item={currentItem}
                                saveItem={(newItem) => editItem(index, newItem)}
                                editMode={true}
                            />:
                            <div className='grid grid-cols-5 items-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] mx-2'>
                                <div>{item.date}</div>
                                <div>{item.time}</div>
                                <div>{item.repeat.join(', ')}</div>
                                <div className='flex col-span-2 items-center justify-center'>
                                    <div>{item.note}</div>
                                    <button onClick={() => handleEdit(index)} className='p-2 text-2xl rounded-[50px] border-2 mx-2 my-3 border-black hover:scale-110'><FiEdit2 /></button>
                                    <button onClick={() => deleteItem(index)} className='p-2 text-2xl rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </>)}
            <Guardian isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>
        </div>
    );
};

export default SchedulePage;

