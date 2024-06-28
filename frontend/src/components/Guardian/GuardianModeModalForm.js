import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import api from '../../services/Api';

const GuardianModeModalForm = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [guardianPassword, setGuardianPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const closeModal = () => {
        setIsOpen(false);
    }

    const inputGaurdian = (e) => {
        setGuardianPassword(e.target.value)
    }

    // 서버에 보호자 모드 로그인 요청
    const goGaurdian = async () => {
        try {
            const response = await api.post('/v1/auth/switch', {
                password: guardianPassword,
            });
            const check = response.data.check;
            if (check) {
                setIsOpen(false);
            }
            else if (guardianPassword === '') {
                setErrorMessage('비밀번호를 입력해 주세요.');
            }
            else {
                setErrorMessage('비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            setErrorMessage('보호자 로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    }

    useEffect(() => {
        setIsOpen(true)
        resetForm();
    }, [])

    const resetForm = () => {
        setErrorMessage('');
        setGuardianPassword('');
    }

    return (
        <div className='flex justify-center items-center'>
        <Modal 
            overlayClassName='fixed flex justify-center items-center inset-0 bg-primary' 
            isOpen={isOpen} 
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={false}
            className='w-[400px] h-[280px] pb-6 flex shadow-[6px_5px_10px_#a5996e] justify-center items-center bg-primary rounded-[15px]'>
        <div className='flex-col flex mt-8 text-3xl'>
            <h2>비밀번호</h2>
            <input className='input-box mt-5 mx-20' type='password' value={guardianPassword} placeholder='비밀번호' onChange={inputGaurdian}/>
            <div className='flex justify-center'>
                <div>
                    <div className='text-small-size text-red-500 mb-6'>{errorMessage}</div>
                    <div className='-mt-4'><button className='btn w-24' onClick={goGaurdian}>보호자 로그인</button></div>
                </div>
            </div>
        </div>     
        </Modal>
    </div>
    )
};

export default GuardianModeModalForm;