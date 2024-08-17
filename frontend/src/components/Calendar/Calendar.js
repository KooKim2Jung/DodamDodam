import React, { useState, useContext } from 'react';
import { FiX } from "react-icons/fi";
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko'; // 한국어 로케일 가져오기
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import { AppContext } from '../../App';

registerLocale('ko', ko); // 한국어 로케일 등록
setDefaultLocale('ko'); // 기본 로케일을 한국어로 설정

const Calendar = ({ onDateChange, selectedDates }) => {
    const { isCalendarOpen, setIsCalendarOpen } = useContext(AppContext);

    const [selectedDate, setSelectedDate] = useState(null);

    const openModal = () => {
        setIsCalendarOpen(true);
    };

    const closeModal = () => {
        setIsCalendarOpen(false)
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateChange(date); // 선택된 날짜를 부모 컴포넌트로 전달
        closeModal();
    };

    const today = new Date(); // 오늘 날짜를 설정

    return (
        <div>
            <Modal
                overlayClassName="fixed mt-20 z-20 inset-0 flex justify-center items-center"
                isOpen={isCalendarOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={false}
                className="w-[500px] bg-primary rounded-[10px] shadow-[2px_4px_10px_#a5996e]"
            >
                <div className='flex justify-end mt-2 mr-6'>
                    <button className='w-8 h-8 bg-primary border-2 text-2xl items-center 
                    justify-center flex rounded-[50px] border-white hover:scale-110' onClick={closeModal}><FiX /></button>
                </div>
                <div className="flex justify-center items-center mt-2 mb-9">
                    <DatePicker
                        locale="ko"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        maxDate={today} // 미래 날짜 비활성화
                        inline
                        // highlightDates={selectedDates} // 선택된 날짜들을 하이라이트
                    />
                </div>
            </Modal>
            <button onClick={openModal}>날짜 선택</button>
        </div>
    );
};

export default Calendar;
