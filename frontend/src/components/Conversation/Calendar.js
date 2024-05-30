import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../../services/Api';

const Calendar = () => {
    const [data, setData] = useState({
        date: '', 
        error: '' 
     });

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const fetchCalendar = async (date) => { // 날짜 가져오기
        try {
            const response = await api.get(`/v1/conversation/${date}`);
            if (response.data) {
                const { time } = response.data;
                if (/^\d{4}-\d{2}-\d{2}$/.test(time)) { // 날짜 형식 확인
                    setData({
                        date: time,
                        error: '',
                    });
                } else {
                    setData({
                        date: '',
                        error: '날짜 데이터가 없습니다.',
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching Calendar:', error);
        }
    }

    useEffect(() => {
        fetchCalendar();
    }, [])

    return (
        <div>
            <Modal
                overlayClassName="fixed mt-20 z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center" 
                isOpen={isOpen} 
                onRequestClose={closeModal}
                className='w-[500px] h-[440px] bg-primary rounded-[10px]'
            >
                <div className='flex justify-center items-center mt-3'>
                    <div className='rounded-[10px] w-[450px] h-[300px] bg-white border-black border-2'>{data.date ? data.date : data.error}</div>
                </div>
                <div className='justify-center items-end mt-4 mb-3'>
                    <button className='text-3xl border-2 px-7 py-2 rounded-[10px] border-black' onClick={closeModal}>확인</button>
                </div>
            </Modal>
            <button onClick={openModal}>날짜 선택</button>
        </div>
    );
};

export default Calendar;