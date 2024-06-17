import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko'; // 한국어 로케일 가져오기
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

registerLocale('ko', ko); // 한국어 로케일 등록
setDefaultLocale('ko'); // 기본 로케일을 한국어로 설정

const Calendar = ({onDateChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateChange(date); // 선택된 날짜를 부모 컴포넌트로 전달
        closeModal();
    }

    return (
        <div>
            <Modal
                overlayClassName="fixed mt-20 z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center" 
                isOpen={isOpen} 
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={false}
                className='w-[500px]  bg-primary rounded-[10px] border-2 border-black'
            >
                <div className='flex justify-center items-center mt-5 mb-5'>
                    <DatePicker
                        locale="ko" 
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                    />
                </div>
                <div className='justify-center items-end mb-5'>
                    <button className='text-3xl border-2 px-7 py-2 rounded-[10px] border-black' onClick={closeModal}>확인</button>
                </div>
            </Modal>
            <button onClick={openModal}>날짜 선택</button>
        </div>
    );
};

export default Calendar;