import React, { useState, useEffect } from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import ConversationSummary from '../../../components/Conversation/ConversationSummary';
import Calendar from '../../../components/Conversation/Calendar';
import ConversationContentBoard from '../../../components/Conversation/ConversationContentBoard';
import api from '../../../services/Api';

const ViewConversationPage = () => {
    const [conversation, setConversation] = useState({
        speaker: '',
        content: '',
        time: '',
        voice: '',
    });

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

    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        fetchConversation(formattedDate); // 선택된 날짜로 대화 내용 가져오기
    }

    return (
        <div className='flex flex-col h-screen w-screen pl-[240px] pr-10'>
            <AsideForm />
            <div className='pt-28 pl-5 relative h-full'>
                <div className='flex justify-between text-2xl'>
                    <Calendar onDateChange={handleDateChange}/>
                    <ConversationSummary conversation={conversation}/>
                </div>
                <div className='mb-3 text-left text-2xl'>{conversation.time}</div>
                <ConversationContentBoard conversation={conversation} setConversation={setConversation}/>
            </div>
        </div>
    );
};

export default ViewConversationPage;
