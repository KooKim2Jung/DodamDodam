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
        <div className='w-full text-2xl mt-6 px-3'>
            <HomeInformationCheck 
                data={data} 
                homeInformationError={homeInformationError} 
                setHomeInformationError={setHomeInformationError}
            />
            <div className='flex flex-col md:flex-row w-full items-center space-y-3 md:space-y-0'>
                <input 
                    className='flex-grow px-3 py-2 mr-0 md:mr-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none w-full'
                    type='text'
                    name='content'
                    placeholder='예시) 도담아, 냉장고 안에 제육볶음 있어'
                    value={data.content}
                    onChange={inputData}
                />
                <button 
                    className='p-2 w-full md:w-16 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110 transition-all duration-150' 
                    onClick={submitData}
                >
                    {editMode ? '저장' : '추가'}
                </button>
            </div>
        </div>
    );
};

export default HomeInformationForm;