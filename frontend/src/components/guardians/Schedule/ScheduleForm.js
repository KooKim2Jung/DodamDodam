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

    const days = ['월', '화', '수', '목', '금', '토', '일'];

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
        <div className="w-full px-6 py-2 text-2xl">
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                <input
                    className='py-2 px-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                    type="date"
                    name="date"
                    value={schedule.date}
                    onChange={inputSchedule}
                />
                <input
                    className='py-2 px-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                    type="time"
                    name="time"
                    value={schedule.time}
                    onChange={inputSchedule}
                />
                <div className='flex flex-col justify-center rounded-[50px] bg-secondary border-2 border-transparent md:flex-row items-center md:col-span-2'>
                    {days.map((day) => (
                        <label key={day} className="flex items-center mr-3">
                            <input
                                className='rounded-[50px] radio-box bg-primary checked:bg-secondary border-white shadow-custom1 m-1'
                                type='checkbox'
                                name='repeat'
                                value={day}
                                checked={schedule.repeat.includes(day)}
                                onChange={inputRepeat}
                            />
                            <span>{day}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className='mt-4 w-full flex'>
                <input
                    className='flex-grow py-2 px-3 mr-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none sm:max-w-[100%] max-w-[80%]'
                    type="text"
                    name="note"
                    value={schedule.note}
                    onChange={inputSchedule}
                    placeholder="내용 입력"
                />
                <button
                    onClick={submitSchedule}
                    className='p-2 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110'
                >
                    {editMode ? '저장' : '추가'}
                </button>
            </div>
            <ScheduleCheck
                schedule={schedule}
                setScheduleError={setScheduleError}
                scheduleError={scheduleError}
                editMode={editMode}
            />
        </div>
    );
};

export default ScheduleForm;