import React from 'react';
import DetailForm from '../../../components/Detail/DetailForm';

const ConversationSummaryPage = () => {
    return (
        <div>
            <DetailForm 
                function_icon='./image/speechbubble.png'
                function_title='대화 요약'
                function_explanation='피보호자와 나눈 대화중 중요한 내용을 요약해서 보호자에게 알려줘요.'
                left_link='/EmotionalAnalysisPage'
                right_link='/SchedulingPage'
            />
        </div>
    );
};

export default ConversationSummaryPage;