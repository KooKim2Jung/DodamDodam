import React, { useState, useEffect } from 'react';
import ScheduleCheck from './ScheduleCheck';

const ScheduleForm = ({ addItem, item, saveItem, editMode = false }) => {

    const [schedule, setSchedule] = useState({
        date: '',
        time: '',
        repeat: [],
        note: '',
    });

    const [scheduleError, setScheduleError] = useState('');

    const days = ['월', '화', '수', '목', '금'];

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
    };

    const inputRepeat = (e) => {
        const { value, checked } = e.target;
        setSchedule(schedule => {
            if (checked) {
                const updateRepeat = [...schedule.repeat, value]
                return { ...schedule, repeat: updateRepeat.sort((a,b) => days.indexOf(a) - days.indexOf(b))};
            } else {
                return { ...schedule, repeat: schedule.repeat.filter(day => day !== value) }
            }
        });
    };

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
                repeat: [],
                note: '',
            });
        } else {
            console.log('스케줄 입력 실패!');
        }
    };

    return (
        <div>
            <div className='grid grid-cols-5 w-full gap-3 px-4 mt-[10px] text-2xl'>
                <input className='p-2 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                    type="date"
                    name="date"
                    value={schedule.date}
                    onChange={inputSchedule}
                />
                <input className='py-2 px-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                    type="time"
                    name="time"
                    value={schedule.time}
                    onChange={inputSchedule}
                />
                <div className='py-2 px-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'>
                {days.map((day) => (
                    <label key={day}>
                        <input className='ml-8 mr-3 radio-box bg-primary checked:bg-secondary border-white shadow-custom1'
                            type='checkbox'
                            name='repeat'
                            value={day}
                            checked={schedule.repeat.includes(day)}
                            onChange={inputRepeat}
                        />{day}
                    </label>
                ))}</div>
                <div className='col-span-2 flex items-center'>
                    <input className='flex-1 py-2 px-3 mr-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                        type="text"
                        name="note"
                        value={schedule.note}
                        onChange={inputSchedule}
                    />
                    <button onClick={submitSchedule} className='p-2 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110'>
                        {editMode ? '저장' : '추가'}
                    </button>
                </div>
            </div>
            <ScheduleCheck schedule={schedule} setScheduleError={setScheduleError} scheduleError={scheduleError} editMode={editMode}/>
        </div>
    );
};

export default ScheduleForm;