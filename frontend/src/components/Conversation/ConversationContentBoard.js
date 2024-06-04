import React, { useEffect } from 'react';
import api from '../../services/Api';

const ConversationContentBoard = ({ conversation, setConversation }) => {
    const fetchConversation = async (date) => { // 특정 날짜에 대한 대화 내용 가져오기
        try {
            const response = await api.get(`/v1/conversation/${date}`);
            if (response.data) {
                const { speaker, content, time, voice } = response.data;
                if (/^\d{4}-\d{2}-\d{2}$/.test(time)) { // 날짜 형식 확인
                    setConversation({
                        speaker: speaker,
                        content: content,
                        time: time,
                        voice: voice,
                    });
                } else {
                    console.error(response.data);
                }
            }
        } catch (error) {
            console.error('Error fetching view conversation:', error);
        }
    }

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        fetchConversation(today);
    }, []);

    return (
        <div className='w-1/2 px-4 pt-3 pb-1 bg-secondary border-2 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e]'>
            {conversation.content}
        </div>
    );
};

export default ConversationContentBoard;