import React from 'react';
import DetailForm from '../DetailForm';

const ConversationSummary = () => {
    return (
        <div>
            <DetailForm 
                icon='./images/speechbubble.png'
                title='대화 요약'
                description='피보호자와 나눈 대화중 중요한 내용을 요약해서 보호자에게 알려줘요.'
            />
        </div>
    );
};

export default ConversationSummary;
