import React, { useState } from 'react';

const HomeInformationForm = ({ addItem }) => {
    const [data, setData] = useState({
        content: '',
    });

    const inputData = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name] : value
        }));
    }

    const submitData = () => {
        addItem(data);
        setData({
            content: '',
        });
    }

    return (
        <div>
            <input className='w-[350px] py-2 px-3 mr-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                type='text'
                name='content'
                value={data.content}
                onChange={inputData}
            />
            <button  className='p-2 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110' onClick={submitData}>추가</button>
        </div>
    );
};

export default HomeInformationForm;