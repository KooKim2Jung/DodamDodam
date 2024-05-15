import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './Toggle.css';

const Toggle = () => {
    const [isToggled, setIsToggled] = useState('피보호자')
    const [isOpen, setIsOpen] = useState(false)
    const [gaurdian, setGaurdian] = useState('')
    const navigate = useNavigate();
    const location = useLocation();

    useEffect (() => {
        console.log(isToggled, isOpen)
        if (isToggled === '보호자' && location.pathname !== '/ViewConversationPage') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
            if (isToggled === '피보호자') {
                navigate('/WardPage')
            }
        }
    }, [isToggled, isOpen])

    const modeChange = (e) => {
        setIsToggled(e.target.value);
    }

    const goGaurdian = () => {
        setIsOpen(false)
        if (isToggled === '피보호자') {
            navigate('/WardPage')
        }
        else {
            navigate('/ViewConversationPage')
        }
    }

    const inputGaurdian = (e) => {
            setGaurdian(e.target.value)
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
            <Modal 
                overlayClassName='w-[400px] h-[250px] z-20 mt-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-[15px] shadow-[6px_4px_10px_#a5996e]' 
                isOpen={isOpen} 
                onRequestClose={() => setIsOpen(false)}
                className='w-[400px] h-[250px] bg-primary rounded-[15px]' >
            <div className='flex-col flex mt-8 text-3xl'>
                <h2>비밀번호</h2>
                <input className='input-box mt-5 mx-20 my-3' type='password' value={gaurdian} placeholder='비밀번호' onChange={inputGaurdian}/>
                <div className='flex justify-center'>
                    <button className='btn w-24' onClick={goGaurdian}>보호자 로그인</button>
                </div>
            </div>     
            </Modal>
        </div>
    );
};

export default Toggle;