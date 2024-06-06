import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import api from '../../services/Api';
import './Toggle.css';

const Toggle = ({ userEmail }) => {
    const [isToggled, setIsToggled] = useState('피보호자')
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();

    const [gaurdianMessage, setGaurdianMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    useEffect (() => {
        resetForm();
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

    // 서버에 보호자 로그인 요청
    const goGaurdian = async () => {
        try {
            const response = await api.post('/v1/auth/login', {
                email: userEmail, 
                password: gaurdianMessage,
            });
            setIsOpen(false)
            navigate('/ViewConversationPage')
        } catch (error) {
        setErrorMessage('다시 입력해 주세요.');
    }
    }

    const resetForm = () => {
        setErrorMessage('');
        setGaurdianMessage('');
    }

    const inputGaurdian = (e) => {
            setGaurdianMessage(e.target.value)
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
                overlayClassName='w-[400px] h-[280px] z-20 mt-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-[15px] shadow-[6px_4px_10px_#a5996e]' 
                isOpen={isOpen} 
                onRequestClose={() => setIsOpen(false)}
                className='w-[400px] h-[280px] bg-primary rounded-[15px]' >
            <div className='flex-col flex mt-8 text-3xl'>
                <h2>비밀번호</h2>
                <input className='input-box mt-5 mx-20' type='password' value={gaurdianMessage} placeholder='비밀번호' onChange={inputGaurdian}/>
                <div className='flex justify-center'>
                    <div>
                        <div className='text-small-size text-red-500 mb-6'>{errorMessage}</div>
                        <div className='-mt-4'><button className='btn w-24' onClick={goGaurdian}>보호자 로그인</button></div>
                    </div>
                </div>
            </div>     
            </Modal>
        </div>
    );
};

export default Toggle;