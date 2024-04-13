import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailForm from '../../../components/Detail/DetailForm';

const EmotionalAnalysisPage = () => {
    const location = useLocation();
    const hideTriangle = location.pathname === '/EmotionalAnalysisPage';
    console.log(hideTriangle)

    return (
        <div className='EmotionalAnalysis'>
            <DetailForm 
                icon='./image/love.png'
                title='감정 분석'
                description='대화내용을 분석해서 보호자에게 피호보자의 감정 상태를 알려줘요.'
                hideLeftTriangle={hideTriangle}
                right_link='/ConversationSummaryPage'
            />
        </div>
    );
};

export default EmotionalAnalysisPage;