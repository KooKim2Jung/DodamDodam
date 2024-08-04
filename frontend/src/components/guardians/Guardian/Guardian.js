import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import api from '../../../Service/Api';

const Guardian = ({ isGuardian, setIsGuardian, isWardSetting }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [guardianPassword, setGuardianPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        if (isWardSetting === false) {
            navigate('/WardSettingsPage');
        }
        else {
            navigate('/ViewConversationPage');
        }
        setIsOpen(false);
    }

    const inputGuardian = (e) => {
        setGuardianPassword(e.target.value)
    }

    // 서버에 보호자 모드 로그인 요청
    const goGuardian = async (event) => {
        event.preventDefault();
        if (!guardianPassword) {
            setErrorMessage('비밀번호를 입력해 주세요.');
            return;
        }
        try {
            const response = await api.post('/v1/auth/switch', {
                password: guardianPassword,
            });
            const check = response.data.check;
            if (check) {
                setIsGuardian(true);
                closeModal();
            }
            else {
                setErrorMessage('비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            setErrorMessage('보호자 로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    }

    useEffect(() => {
        resetForm();
        if (isGuardian === false) {
            openModal();
        }
    }, [isGuardian])

    const resetForm = () => {
        setErrorMessage('');
        setGuardianPassword('');
    }

    return (
        <Modal 
            overlayClassName='fixed flex z-30 justify-center items-center inset-0 bg-primary outline-none' 
            isOpen={isOpen} 
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={false}
            className='outline-none w-[400px] h-[280px] z-50 pb-6 flex shadow-[6px_5px_10px_#a5996e] justify-center items-center bg-primary rounded-[15px]'>
            <form onSubmit={goGuardian}>
                <div className='flex-col flex mt-8 text-3xl'>
                    <h2>비밀번호</h2>
                    <input className='input-box mt-5 mx-20' type='password' value={guardianPassword} placeholder='비밀번호 (로그인 비밀번호)' onChange={inputGuardian}/>
                    <div className='flex justify-center'>
                        <div>
                            <div className='text-small-size mb-6 w-80'>{errorMessage}</div>
                            <div className='-mt-4'><button className='btn w-24' type='submit'>보호자 로그인</button></div>
                        </div>
                    </div>
                </div>
            </form>     
        </Modal>
    )
};

export default Guardian;