import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './ToggleForm.css';

const ToggleForm = () => {
    const [isToggled, setIsToggled] = useState('피보호자')

    const navigate = useNavigate();
    const location = useLocation();

    useEffect (() => {
        if (isToggled === '보호자') {
            navigate('/ViewConversationPage')
        } 
        else if (isToggled === '피보호자') {
            navigate('/WardPage')
        }
    }, [isToggled])

    const modeChange = (e) => {
        setIsToggled(e.target.value);
    }

    return (
        <div className='text-middle-size'>
            <div className='relative -left-3 flex justify-center items-center w-[200px] bg-secondary rounded-[20px] py-1 pr-2'>
                <input
                    id='guardian'
                    type='radio'
                    name='guardian'
                    value='보호자'
                    checked={isToggled === '보호자'}
                    onChange={modeChange}
                    className='appearance-none'
                />
                <label htmlFor='guardian' className='toggle-label'>보호자</label>
                <input
                    id='ward'
                    type='radio'
                    name='ward'
                    value='피보호자'
                    checked={isToggled === '피보호자'}
                    onChange={modeChange}
                    className='appearance-none'
                />
                <label htmlFor='ward' className='toggle-label'>피보호자</label>
                <div className='slider'></div>
            </div>
        </div>
    );
};

export default ToggleForm;