import React, { useState } from 'react';

const ScheduleEditForm = ({ item, saveItem }) => {
    const [newSchedule, setNewSchedule] = useState({
        date: item?.date || '',
        time: item?.time || '',
        repeat: item?.repeat || '',
        note: item?.note || '',
    })

    const [scheduleError, setScheduleError] = useState('')

    const newInputSchedule = (e) => {
        const { value, name } = e.target;
        setNewSchedule(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const SaveSchedule = () => {
        if(newScheduleCheck()) {
            saveItem(newSchedule)
            console.log('스케줄 수정 성공!')
        }
        else {
            console.log('스케줄 수정 실패!')
        }
    }

    const newScheduleCheck = () => {
        let today = new Date().toISOString().split('T')[0];

        if (!newSchedule.date || !newSchedule.time || !newSchedule.note || !newSchedule.repeat) {
            setScheduleError('모든 항목을 입력해 주세요.');
            return false;
        }
        else if(newSchedule.date < today) {
            setScheduleError('현재 날짜 이후로 선택해 주세요.');
            return false;
        }
        else {
            setScheduleError('');
            return true;
        }
    };

    return (
        <div className='grid grid-cols-5 w-[1040px] gap-3 pl-4 pr-4  text-2xl'>
            <input className='p-2 m-2 rounded-[10px] border-2 border-black outline-none'
                type="date"
                name="date"
                value={newSchedule.date}
                onChange={newInputSchedule}
            />
            <input className='py-2 px-3 m-2 rounded-[10px] border-2 border-black outline-none z-10'
                type="time"
                name="time"
                value={newSchedule.time}
                onChange={newInputSchedule}
            />
            <input className='py-2 px-3 m-2 rounded-[10px] border-2 border-black outline-none'
                type="text"
                name="repeat"
                value={newSchedule.repeat}
                placeholder='월,수,금'
                onChange={newInputSchedule}
            />
            <div className='col-span-2 flex items-center'>
                <input className='flex-1 py-2 px-3 m-2 rounded-[10px] border-2 border-black outline-none'
                    type="text"
                    name="note"
                    value={newSchedule.note}
                    onChange={newInputSchedule}
                />
                <button onClick={SaveSchedule} className='p-2 rounded-[10px] border-2 border-black'>저장</button>
            </div>
            <div className='text-2xl w-[1010px] text-red-500'>{scheduleError}</div>
        </div>
    );
};

export default ScheduleEditForm;