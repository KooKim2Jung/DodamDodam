import React, { useState, useContext } from 'react';
import { FiXCircle } from "react-icons/fi";
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
    const { isCalendarOpen, setIsCalendarOpen, isHelpOpen, helpStep } = useContext(AppContext);

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
            overlayClassName="fixed mt-20 z-40 inset-0 flex justify-center items-center"
            isOpen={isCalendarOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={false}
            className="w-[500px] bg-primary rounded-[10px] shadow-[2px_4px_10px_#a5996e]"
            >
                <div className='flex justify-end mt-2 mr-6'>
                    <button className='hover:scale-110' onClick={closeModal}><FiXCircle size={30}/></button>
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
            <button className={`relative py-2 px-3 -mt-2 ${isHelpOpen && helpStep === 0 ? 'bg-primary z-40 rounded-[10px]' : ''}`} onClick={openModal}>날짜 선택</button>
        </div>
    );
};

export default Calendar;
