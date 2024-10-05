import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import api from '../../../Service/Api';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../../AppProvider';

const Guardian = () => {
    const { setIsGuardian, isGuardianOpen, setIsGuardianOpen, isWardSet, isLoggedIn, isLoading } = useContext(AppContext)
    const [guardianPassword, setGuardianPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const openModal = () => {
        setIsGuardianOpen(true);
    }

    const closeModal = () => {
        setIsGuardianOpen(false);
    }

    const inputGuardian = (e) => {
        setGuardianPassword(e.target.value)
    }

    // 서버에 보호자 모드 로그인 요청
    const isGuardian = async (event) => {
        event.preventDefault();
        if (!guardianPassword) {
            setErrorMessage('비밀번호를 입력해 주세요.');
            return;
        }
        try {
            const response = await api.post('/v1/auth/switch', {
                password: guardianPassword,
            });
            if (response.data.check) {
                setIsGuardian(true);
                sessionStorage.setItem('isGuardian', 'true')
                goGuardian();
            }
            else {
                setErrorMessage('비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            setErrorMessage('보호자 로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    }

    // 서버에 피보호자 설정 유무 확인
    const goGuardian = () => {
        if (isWardSet) {
            navigate('/ViewConversationPage');
        }
        else {
            navigate('/WardSettingsPage');
        }
        closeModal();
    }

    useEffect(() => {
        resetForm();
        if (isGuardianOpen) {
            openModal();
        } else {
            closeModal();
        }
    }, [isGuardianOpen]);

    useEffect(() => {
        if (!isLoading) {
            const guardianPages = location.pathname === '/ViewConversationPage' || location.pathname === '/ViewEmotionAnalysisPage'
            || location.pathname === '/SchedulePage' || location.pathname === '/HomeInformationSettingsPage' || location.pathname === '/DodamSettingsPage';

            if (guardianPages && !isWardSet) {
                alert('피보호자 설정이 필요합니다.');
                navigate('/WardSettingsPage');
            }
            if (isLoggedIn && !guardianPages && location.pathname !== '/WardSettingsPage') {
                sessionStorage.setItem('isGuardian', 'false');
                setIsGuardian(false);
            }
        }
    }, [location.pathname, isLoading])

    if (isLoading) {
        return null;
    }

    const resetForm = () => {
        setErrorMessage('');
        setGuardianPassword('');
    }

    return (
        <Modal 
            overlayClassName='fixed flex z-50 justify-center items-center inset-0 bg-primary outline-none' 
            isOpen={isGuardianOpen} 
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={false}
            className='outline-none mt-16 w-[400px] h-[280px] pb-6 flex shadow-[6px_5px_10px_#a5996e] justify-center items-center bg-primary rounded-[15px]'>
            <form onSubmit={isGuardian}>
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