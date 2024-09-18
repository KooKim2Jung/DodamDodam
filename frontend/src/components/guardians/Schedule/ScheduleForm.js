import React, { useState, useEffect } from 'react';
import ScheduleCheck from './ScheduleCheck';
import api from '../../../Service/Api';

const ScheduleForm = ({ addItem, item, isEditing, setIsEditing, editItem, setError, items, index }) => {

    const [schedule, setSchedule] = useState({
        date: '',
        time: '',
        repeat: [],
        content: '',
    });

    const [scheduleError, setScheduleError] = useState('');

    const days = ['월', '화', '수', '목', '금', '토', '일'];

    useEffect(() => {
        if (isEditing && item) {
            const [date, time] = item.date.split('T');
            setSchedule({
                ...item,
                date: date,
                time: time.slice(0, 5),
            });
        }
    }, [isEditing, item]);

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

    const submitSchedule = async (index) => {
        if (!scheduleError) {
            const dateTime = `${schedule.date}T${schedule.time}:00`;

            if (isEditing) {
                try {
                    const response = await api.put(`/v1/schedule/${items[index].id}`, {
                        date: dateTime,
                        repeat: schedule.repeat,
                        content: schedule.content,
                    })
                    if (response.data) {
                        editItem(index, response.data);
                    }
                    setIsEditing(false);
                    setSchedule({
                    date: '',
                    time: '',
                    repeat: [],
                    content: ''
                });
                } catch (error) {
                    console.error(error.response.data.detail);
                }
            } else {
                try {
                    const response = await api.post('v1/schedule', {
                        date: dateTime,
                        repeat: schedule.repeat,
                        content: schedule.content,
                    })
                    if (response.data) {
                        addItem(response.data);
                    }
                    setSchedule({
                    date: '',
                    time: '',
                    repeat: [],
                    content: ''
                });
                } catch (error) {
                    console.error('스케줄 요청 오류', error);
                    setError('잠시후에 다시 입력해 주세요.')
                }
            }
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
                <div className='flex justify-center rounded-[50px] bg-secondary border-2 border-transparent md:flex-row items-center md:col-span-2'>
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
                    className='flex-grow py-2 px-3 mr-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                    type="text"
                    name="content"
                    value={schedule.content}
                    onChange={inputSchedule}
                    placeholder="내용 입력"
                />
                <button
                    onClick={() => submitSchedule(index)}
                    className='p-2 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110'
                >
                    {isEditing ? '저장' : '추가'}
                </button>
            </div>
            <ScheduleCheck
                schedule={schedule}
                setScheduleError={setScheduleError}
                scheduleError={scheduleError}
                isEditing={isEditing}
            />
        </div>
    );
};

export default ScheduleForm;