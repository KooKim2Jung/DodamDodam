import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailForm from '../../../components/Detail/DetailForm';

const EmotionalAnalysisPage = () => {
    const location = useLocation();
    const hideTriangle = location.pathname === '/EmotionalAnalysisPage';

    return (
        <div className='EmotionalAnalysis'>
            <DetailForm 
                function_icon='./image/love.png'
                function_title='감정 분석'
                function_explanation='대화내용을 분석해서 보호자에게 피호보자의 감정 상태를 알려줘요.'
                hideLeftTriangle={hideTriangle}
                right_link='/ConversationSummaryPage'
            />
        </div>
    );
};

export default EmotionalAnalysisPage;