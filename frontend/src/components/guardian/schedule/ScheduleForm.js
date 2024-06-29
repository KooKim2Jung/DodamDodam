import React, { useState, useEffect } from 'react';
import ScheduleCheck from './ScheduleCheck';

const ScheduleForm = ({ addItem, item, saveItem, editMode = false }) => {
    const [schedule, setSchedule] = useState({
        date: '',
        time: '',
        repeat: '',
        note: '',
    })

    const [scheduleError, setScheduleError] = useState('')

    useEffect(() => {
        if (editMode && item) {
            setSchedule(item);
        }
    }, [editMode, item]);

    const inputSchedule = (e) => {
        const { name, value } = e.target;
        setSchedule(schedule => ({
            ...schedule,
            [name]: value
        }));
    }

    const submitSchedule = () => {
        if (!scheduleError) {
            if (editMode) {
                saveItem(schedule);
                console.log('스케줄 수정 성공!');
            } else {
                addItem(schedule);
                console.log('스케줄 입력 성공!');
            }
            setSchedule({
                date: '',
                time: '',
                repeat: '',
                note: '',
            });
        } else {
            console.log('스케줄 입력 실패!');
        }
    };

    return (
        <div>
            <div className='grid grid-cols-5 w-full gap-3 px-4 mt-[10px] text-2xl'>
                <input className='p-2 rounded-[10px] border-2 border-black outline-none'
                    type="date"
                    name="date"
                    value={schedule.date}
                    onChange={inputSchedule}
                />
                <input className='py-2 px-3 rounded-[10px] border-2 border-black outline-none z-10'
                    type="time"
                    name="time"
                    value={schedule.time}
                    onChange={inputSchedule}
                />
                <input className='py-2 px-3 rounded-[10px] border-2 border-black outline-none'
                    type="text"
                    name="repeat"
                    value={schedule.repeat}
                    placeholder='월,수,금'
                    onChange={inputSchedule}
                />
                <div className='col-span-2 flex items-center'>
                    <input className='flex-1 py-2 px-3 mr-3 rounded-[10px] border-2 border-black outline-none'
                        type="text"
                        name="note"
                        value={schedule.note}
                        onChange={inputSchedule}
                    />
                    <button onClick={submitSchedule} className='p-2 rounded-[10px] border-2 border-black'>
                        {editMode ? '저장' : '추가'}
                    </button>
                </div>
            </div>
            <ScheduleCheck schedule={schedule} setScheduleError={setScheduleError} scheduleError={scheduleError} editMode={editMode}/>
        </div>
    );
};

export default ScheduleForm;