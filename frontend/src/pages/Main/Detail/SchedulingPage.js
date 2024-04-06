import React from 'react';
import DetailForm from '../../../components/Detail/DetailForm';

const SchedulingPage = () => {
    return (
        <div>
            <DetailForm 
                function_icon='./image/clock.png'
                function_title='스케줄링'
                function_explanation='피보호자의 스케줄을 설정하면 날짜와 시간에 맞춰 피보호자에게 알려줘요.
                반복 기능을 이용해서 요일별로 매주 같은 시간에 스케줄을 설정할 수 있어요.'
                left_link='/ConversationSummaryPage'
                right_link='/SettingsPage'
            />
        </div>
    );
};

export default SchedulingPage;