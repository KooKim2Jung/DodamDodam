import React, { useEffect } from 'react';

const ScheduleForm = ({ addItem, item, isEditing, setIsEditing, editItem, items, index, handleSubmit, onSubmit, register, isSubmitting, trigger, errors, repeat, setRepeat }) => {
    useEffect(() => {
        trigger();
    }, [trigger]);

    const days = ['월', '화', '수', '목', '금', '토', '일'];

    // useEffect(() => {
    //     if (isEditing && item) {
    //         const [date, time] = item.date.split('T');
    //         setSchedule({
    //             ...item,
    //             date: date,
    //             time: time.slice(0, 5),
    //         });
    //     }
    // }, [isEditing, item]);

    const inputRepeat = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setRepeat((prevRepeat) => [...prevRepeat, value].sort((a, b) => days.indexOf(a) - days.indexOf(b)));
        } else {
            setRepeat((prevRepeat) => prevRepeat.filter((day) => day !== value));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full px-6 py-2 text-2xl">
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                <input
                    className='py-2 px-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                    type="date"
                    {...register('date')}
                />
                <input
                    className='py-2 px-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                    type="time"
                    {...register('time')}
                />
                <div className='flex justify-center rounded-[50px] bg-secondary border-2 border-transparent md:flex-row items-center md:col-span-2'>
                    {days.map((day) => (
                        <label key={day} className="flex items-center mr-3">
                            <input
                                className='rounded-[50px] radio-box bg-primary checked:bg-secondary border-white shadow-custom1 m-1'
                                type='checkbox'
                                name='repeat'
                                value={day}
                                checked={repeat.includes(day)}
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
                    placeholder="내용 입력"
                    {...register('content')}
                />
                <button type='submit' disabled={isSubmitting} className='p-2 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110'>
                    {isEditing ? '저장' : '추가'}
                </button>
            </div>
            {errors.formError && <div className='text-2xl w-full my-3 text-gray-400'>{errors.formError.message}</div>}
            </div>
        </form>
    );
};

export default ScheduleForm;