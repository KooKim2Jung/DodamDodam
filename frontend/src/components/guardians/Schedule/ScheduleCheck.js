import React, { useEffect } from 'react';

const ScheduleCheck = ({ schedule, scheduleError, setScheduleError }) => {

    const scheduleCheck = () => {
        let today = new Date().toISOString().split('T')[0];

        if (!schedule.date || !schedule.time || !schedule.content) {
            setScheduleError('모든 항목을 입력해 주세요.');
        }
        else if(schedule.date < today) {
            setScheduleError('현재 날짜 이후로 선택해 주세요.');
        }
        else {
            setScheduleError('');
        }
    };

    useEffect(() => {
        scheduleCheck();
    }, [schedule])
    
    return (
        <div className='text-2xl w-full my-3 text-gray-400'>{scheduleError}</div>
    );
};

export default ScheduleCheck;