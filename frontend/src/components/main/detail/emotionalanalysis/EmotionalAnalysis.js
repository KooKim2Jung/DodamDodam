import React from 'react';
import DetailForm from '../DetailForm';

const EmotionalAnalysis = () => {
    return (
        <div>
            <DetailForm 
                icon='./images/love.png'
                title='감정 분석'
                description='대화내용을 분석해서 보호자에게 피호보자의 감정 상태를 알려줘요.'
            />
        </div>
    );
};

export default EmotionalAnalysis;
