import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './Toggle.css';

const Toggle = () => {
    const [isToggled, setIsToggled] = useState('피보호자');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/WardSettingsPage') {
            setIsToggled('보호자');
        } else if (location.pathname === '/WardPage') {
            setIsToggled('피보호자');
        }
    }, [location.pathname]);

    const modeChange = (e) => {
        const mode = e.target.value;
        setIsToggled(mode);
        if (mode === '피보호자') {
            navigate('/WardPage');
        } else {
            navigate('/WardSettingsPage');
        }
    };

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

export default Toggle;
