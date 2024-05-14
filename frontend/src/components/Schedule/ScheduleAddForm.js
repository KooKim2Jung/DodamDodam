import React, { useState } from 'react';

const ScheduleAddForm = ({ addItem }) => {
    const [schedule, setSchedule] = useState({
        date: '',
        time: '',
        repeat: '',
        note: '',
    })
    
    const [scheduleError, setScheduleError] = useState('')

    const inputSchedule = (e) => {
        const { name, value } = e.target;
        setSchedule(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const submitSchedule = () => {
        if(scheduleCheck()) {
            addItem(schedule)
            console.log('스케줄 입력 성공!')
            setSchedule({
                date: '',
                time: '',
                repeat: '',
                note: '',
            })
        }
        else {
            console.log('스케줄 입력 실패!')
        }
    }

    const scheduleCheck = () => {
        let today = new Date().toISOString().split('T')[0];

        if (!schedule.date || !schedule.time || !schedule.note || !schedule.repeat) {
            setScheduleError('모든 항목을 입력해 주세요.');
            return false;
        }
        else if(schedule.date < today) {
            setScheduleError('현재 날짜 이후로 선택해 주세요.');
            return false;
        }
        else {
            setScheduleError('');
            return true;
        }
    };

    return (
        <div className='grid grid-cols-5 mt-7 w-[1040px] gap-3 pl-4 pr-4 text-2xl'>
            <input className='p-2 m-2 rounded-[10px] border-2 border-black outline-none'
                type="date"
                name="date"
                value={schedule.date}
                onChange={inputSchedule}
            />
            <input className='py-2 px-3 m-2 rounded-[10px] border-2 border-black outline-none z-10'
                type="time"
                name="time"
                value={schedule.time}
                onChange={inputSchedule}
            />
            <input className='py-2 px-3 m-2 rounded-[10px] border-2 border-black outline-none'
                type="text"
                name="repeat"
                value={schedule.repeat}
                placeholder='월,수,금'
                onChange={inputSchedule}
            />
            <div className='col-span-2 flex items-center'>
                <input className='flex-1 py-2 px-3 m-2 rounded-[10px] border-2 border-black outline-none'
                    type="text"
                    name="note"
                    value={schedule.note}
                    onChange={inputSchedule}
                />
                <button onClick={submitSchedule} className='p-2 rounded-[10px] border-2 border-black'>추가</button>
            </div>
            <div className='text-2xl w-[1010px] text-red-500'>{scheduleError}</div>
        </div>
    );
};

export default ScheduleAddForm;