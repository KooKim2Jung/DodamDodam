import React, { useContext, useState } from 'react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import ScheduleForm from '../../../components/guardians/Schedule/ScheduleForm';
import { AppContext } from '../../../AppProvider';

const SchedulePage = () => {
    const { isHelpOpen, helpStep } = useContext(AppContext);
    
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
            <div className={`mt-32 text-3xl ${isHelpOpen && helpStep === 0 ? 'bg-white z-40 rounded-[10px]' : ''}`}>
                <div className='grid grid-cols-4 mb-4 text-center hidden lg:grid'>
                    <h2>날짜</h2>
                    <h2>시간</h2>
                    <h2 className='col-span-2'>반복</h2>
                </div>
                <ScheduleForm addItem={addItem} />
            </div>
            {isHelpOpen ? (<>
                {helpStep === 1 ? (
                    <div className='grid grid-cols-5 text-2xl z-40 items-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] my-2 mx-6'>
                        <div>{testSchedule.testDate}</div>
                        <div>{testSchedule.testTime}</div>
                        <div>{testSchedule.testRepeat}</div>
                        <div className='flex col-span-2 items-center justify-center'>
                            <div>{testSchedule.testNote}</div>
                            <button className='p-2 text-2xl rounded-[50px] border-2 mx-2 my-2 border-black hover:scale-110'><FiEdit2 /></button>
                            <button className='p-2 text-2xl rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
                        </div>
                    </div>
                ) : null}
            </>) : (<>
                {items.map((item, index) => (
                    <div key={index} className='text-2xl'>
                        {isEditing && currentItemIndex === index ?
                            <ScheduleForm 
                                item={currentItem}
                                saveItem={(newItem) => editItem(index, newItem)}
                                editMode={true}
                            />:
                            <div className='grid grid-cols-1 md:grid-cols-5 items-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] my-2 mx-6'>
                                <div className='my-2'>{item.date}</div>
                                <div className='my-2'>{item.time}</div>
                                <div className='my-2'>{item.repeat.join(', ')}</div>
                                <div className='flex col-span-2 items-center justify-center'>
                                    <div>{item.note}</div>
                                    <button onClick={() => handleEdit(index)} className='p-2 text-2xl rounded-[50px] border-2 mx-2 my-2 border-black hover:scale-110'><FiEdit2 /></button>
                                    <button onClick={() => deleteItem(index)} className='p-2 text-2xl rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </>)}
        </div>
    );
};

export default SchedulePage;

