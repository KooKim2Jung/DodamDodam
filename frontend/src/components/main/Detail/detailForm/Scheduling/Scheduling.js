import React from 'react';
import DetailForm from '../DetailForm';

const Scheduling = () => {
    return (
        <div>
            <DetailForm 
                icon='./images/clock.png'
                title='스케줄링'
                description='스케줄을 설정하면 날짜와 시간에 맞춰 피보호자에게 알려줘요.
                반복 기능을 이용해 요일별로 매주 같은 시간에 스케줄을 설정할 수 있어요.'
                image='./images/scheduling_image.png'
            />
        </div>
    );
};

export default Scheduling;
