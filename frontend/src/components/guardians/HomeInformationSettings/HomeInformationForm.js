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
        <div>
            <HomeInformationCheck data={data} homeInformationError={homeInformationError} setHomeInformationError={setHomeInformationError}/>
            <input className='w-[350px] py-2 px-3 mr-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                type='text'
                name='content'
                value={data.content}
                onChange={inputData}
            />
            <button className='p-2 my-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110' 
            onClick={submitData}>{editMode ? '저장' : '추가'}</button>
        </div>
    );
};

export default HomeInformationForm;