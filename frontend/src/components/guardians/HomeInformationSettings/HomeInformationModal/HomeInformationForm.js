import React, { useState, useEffect } from 'react';
import HomeInformationCheck from './HomeInformationCheck';

const HomeInformationForm = ({ addItem, item, saveItem, editMode = false }) => {
    const [data, setData] = useState({
        content: '',
    });

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
            if (editMode) {
                saveItem(data)
            }
            else {
                addItem(data);
            }
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
        <div className='relative flex justify-center'>
            <input className='w-[380px] px-3 mr-2 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                type='text'
                name='content'
                value={data.content}
                onChange={inputData}
            />
            <div className='group'>
                <button className='p-2 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110' 
                onClick={submitData}>{editMode ? '저장' : '추가'}
                </button>
                <div className='absolute -top-8 left-28 right-28 invisible group-hover:visible'>
                    <HomeInformationCheck data={data} homeInformationError={homeInformationError} setHomeInformationError={setHomeInformationError}/>
                </div>
            </div>
        </div>
    );
};

export default HomeInformationForm;