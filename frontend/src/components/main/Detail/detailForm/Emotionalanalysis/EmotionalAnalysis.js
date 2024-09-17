import React from 'react';
import DetailForm from '../DetailForm';

const EmotionalAnalysis = () => {
    return (
        <div>
            <DetailForm 
                icon='./images/love.png'
                title='감정 분석'
                description='도담이와의 대화 내용을 분석해서 보호자에게 피보호자의 감정 상태를 알려줘요.'
                image='./images/emotion_analysis_image.png'
            />
        </div>
    );
};

export default EmotionalAnalysis;
