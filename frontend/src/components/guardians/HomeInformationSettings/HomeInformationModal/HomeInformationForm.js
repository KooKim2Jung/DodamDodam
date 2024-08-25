import React, { useState, useEffect } from 'react';
import HomeInformationCheck from './HomeInformationCheck';

const HomeInformationForm = ({ addItem, item, saveItem, editMode = false }) => {
    const [data, setData] = useState({ content: '', });

    const [homeInformationError, setHomeInformationError] = useState('');

    const inputData = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name] : value
        }));
    }

    const submitData = () => {
        if (!homeInformationError) {
            editMode ? saveItem(data) : addItem(data)
        } 
        setData({
            content: '',
        });
    }

    useEffect(() => {
        if (editMode && item) {
            setData(item);
        }
    }, [editMode, item]);

    return (
        <div className='w-full text-3xl mt-6 pl-3 pr-7'>
            <HomeInformationCheck 
                data={data} 
                homeInformationError={homeInformationError} 
                setHomeInformationError={setHomeInformationError}
            />
            <div className='flex w-full'>
                <input 
                    className='flex-grow px-3 mr-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none w-full'
                    type='text'
                    name='content'
                    placeholder='예시) 도담아, 냉장고 안에 제육볶음 있어'
                    value={data.content}
                    onChange={inputData}
                />
                <button 
                    className='p-2 w-24 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110' 
                    onClick={submitData}
                >
                    {editMode ? '저장' : '추가'}
                </button>
            </div>
        </div> 
    );
};

export default HomeInformationForm;