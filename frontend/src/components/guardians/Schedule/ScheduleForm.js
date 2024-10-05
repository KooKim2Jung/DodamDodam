import React from 'react';

const ScheduleForm = ({ handleSubmit, register, setValue, isSubmitting, errors, buttonText, watch }) => {
    
    const days = ['월', '화', '수', '목', '금', '토', '일'];

    const repeat = watch('repeat', []);

    const inputRepeat = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setValue('repeat', [...repeat, value]); // 체크된 값을 배열에 추가
        } else {
            setValue('repeat', repeat.filter(day => day !== value)); // 체크 해제 시 배열에서 제거
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full px-6 py-2 text-2xl">
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    <input
                        className='py-2 px-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                        type="date"
                        {...register('datePart', { required: true })}
                    />
                    <input
                        className='py-2 px-3 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white outline-none'
                        type="time"
                        {...register('timePart', { required: true })}
                    />
                    <div className='flex py-2 justify-center rounded-[50px] bg-secondary border-2 border-transparent md:flex-row items-center md:col-span-2'>
                        {days.map((day) => (
                            <label key={day} className="flex items-center mr-2">
                                <input
                                    className='rounded-[50px] radio-box bg-primary checked:bg-secondary border-white shadow-custom1 m-1'
                                    type='checkbox'
                                    value={day}
                                    checked={repeat.includes(day)}
                                    onChange={inputRepeat}
                                    {...register('repeat')}
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
                        {...register('content', { required: true })}
                    />
                    <button type='submit' disabled={isSubmitting} className='p-2 rounded-[50px] bg-secondary border-2 border-transparent focus:border-white hover:scale-110'>
                        {buttonText}
                    </button>
                </div>
                {(errors.datePart || errors.timePart || errors.content) && <div className='text-2xl w-full mt-3 text-gray-400'>날짜, 시간, 내용은 필수항목입니다.</div>}
            </div>
        </form>
    );
};

export default ScheduleForm;
