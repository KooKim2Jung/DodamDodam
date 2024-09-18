import React, { useContext, useEffect, useState } from 'react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import ScheduleForm from '../../../components/guardians/Schedule/ScheduleForm';
import { AppContext } from '../../../AppProvider';
import api from '../../../Service/Api';

const SchedulePage = () => {
    const { isHelpOpen, helpStep } = useContext(AppContext);
    
    const [items, setItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(null);

    const [error, setError] = useState('');

    const testSchedule = {
        testDate: '2024-01-01',
        testTime: '15:40',
        testRepeat: '월,수,금',
        testcontent: '수학 학원 가기'
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

    const handleEdit = (index, id) => {
        setCurrentItem(items[index]);
        setCurrentItemIndex(index);
        setIsEditing(true);
    };

    const getSchedule = async () => {
        try {
            const response = await api.get('/v1/schedule');
            if (response.data) {
                setItems(response.data);
            }
        } catch (error) {
            console.log(error.response.data.detail);
            setError('스케줄을 찾을 수 없어요');
        }
    }

    const deleteSchedule = async (index) => {
        try {
            const response = await api.delete(`/v1/schedule/${items[index].id}`)
            if (response.data) {
                deleteItem(index);
                console.log(response.data.detail);
            }
        } catch (error) {
            console.log(error.response.data.detail);
        }
    }

    useEffect(() => {
        getSchedule();
    }, []);

    return (
        <div className='flex flex-col h-screen w-screen md:pl-[240px]'>
            <div className={`pt-20 md:pt-32 text-3xl ${isHelpOpen && helpStep === 0 ? 'bg-white z-40 rounded-[10px]' : ''}`}>
                <div className='grid grid-cols-4 mb-4 text-center hidden lg:grid'>
                    <h2>날짜</h2>
                    <h2>시간</h2>
                    <h2 className='col-span-2'>반복</h2>
                </div>
                <ScheduleForm addItem={addItem} setError={setError}/>
                {items.length === 0 && error ? (<>
                    <div className='flex justify-center mb-2'><img className='h-[120px] w-[105px]' src='./images/dodam_nodata.png'/></div>
                    <div className='text-center text-2xl text-gray-400'>{error}</div>
                </>) : null}
            </div>
            {isHelpOpen ? (<>
                {helpStep === 1 ? (
                    <div className='grid grid-cols-1 md:grid-cols-5 text-2xl z-40 items-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] my-2 mx-6'>
                        <div>{testSchedule.testDate}</div>
                        <div>{testSchedule.testTime}</div>
                        <div>{testSchedule.testRepeat}</div>
                        <div className='flex col-span-2 items-center justify-center'>
                            <div>{testSchedule.testcontent}</div>
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
                                items={items}
                                index={index}
                                item={currentItem}
                                editItem={editItem}
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                                setError={setError}
                            />:
                            <div className='grid grid-cols-1 md:grid-cols-5 items-center border-transparent bg-white shadow-[2px_4px_1px_#a5996e] rounded-[50px] my-2 mx-6'>
                                <div className='my-2'>{item.date.split('T')[0]}</div>
                                <div className='my-2'>{item.date.split('T')[1].slice(0, 5)}</div>
                                <div className='my-2'>{item.repeat.join(', ')}</div>
                                <div className='flex md:col-span-2 items-center justify-center'>
                                    <div>{item.content}</div>
                                    <button onClick={() => handleEdit(index, items[index].id)} className='p-2 text-2xl rounded-[50px] border-2 mx-2 my-2 border-black hover:scale-110'><FiEdit2 /></button>
                                    <button onClick={() => deleteSchedule(index, items[index].id)} className='p-2 text-2xl rounded-[50px] border-2 border-black hover:scale-110'><FiTrash2 /></button>
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

