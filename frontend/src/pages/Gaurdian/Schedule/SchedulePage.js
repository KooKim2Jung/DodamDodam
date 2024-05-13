import React, { useState } from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import ScheduleAddForm from '../../../components/Schedule/ScheduleAddForm';
import ScheduleEditForm from '../../../components/Schedule/ScheduleEditForm';

const SchedulePage = () => {
    const [items, setItems] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [currentItem, setCurrentItem] = useState(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(null);

    const addItem = (item) => {
        setItems(prevItems => [...prevItems, item])
    }

    const deleteItem = (index) => {
        setItems(prevItems => prevItems.filter((_,i) => i !== index))
    }

    const editItem = (index, newItem) => {
        setItems(prevItems => prevItems.map((item, i) => i === index ? newItem : item));
    };

    const saveItem = (newItem) => {
        if (currentItemIndex !== null) {
            editItem(currentItemIndex, newItem);
            setIsEditing(false); 
        }
    };

    const handleEdit = (index) => {
        setCurrentItem(items[index]); //선택된 스케줄의 전체 데이터를 상태 변수에 저장
        setCurrentItemIndex(index); //수정하고자 하는 스케줄의 위치(인덱스)를 상태 변수에 저장
        setIsEditing(true);
    };

    return (
        <div className='flex flex-col h-screen w-screen pl-[240px]'>
            <AsideForm/>
            <div className='grid grid-cols-5 pt-32 text-3xl'>
                <h2>날짜</h2>
                <h2>시간</h2>
                <h2>반복</h2>
                <h2 className='col-span-2'>내용</h2>
                <ScheduleAddForm addItem={addItem}/>
            </div>
            <div className='mt-7 w-[1040px] gap-3 text-2xl'>{ isEditing ?
            <ScheduleEditForm item={currentItem} saveItem={saveItem}/>
            :<>{items.map((item, index) => (
                    <div key={index} className='grid grid-cols-5 mb-5 items-center'>
                        <div>{item.date}</div>
                        <div>{item.time}</div>
                        <div>{item.repeat}</div>
                        <div className='flex col-span-2 items-center justify-center'>
                            <div>{item.note}</div>
                            <button onClick={() => handleEdit(index)} className='p-2 text-2xl rounded-[10px] border-2 mx-2 border-black'>수정</button>
                            <button onClick={() => deleteItem(index)} className='p-2 text-2xl rounded-[10px] border-2 border-black'>삭제</button>
                        </div>
                    </div>
                ))}</>}
            </div>
        </div>
    );
};

export default SchedulePage;