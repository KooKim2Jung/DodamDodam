import React, { useState, useEffect } from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import ConversationSummary from '../../../components/Conversation/ConversationSummary';
import Calendar from '../../../components/Calendar/Calendar';
import ConversationContentBoard from '../../../components/Conversation/ConversationContentBoard';
import api from '../../../services/Api';

const ViewConversationPage = () => {
    const [conversations, setConversations] = useState([]);
    const [isSelected, setIsSelected] = useState(true);
    const [selectedDates, setSelectedDates] = useState([]);
    const [error, setError] = useState('');

    const fetchConversation = async (date) => { // 특정 날짜에 대한 대화 내용 가져오기
        try {
            const response = await api.get(`/v1/conversation/${date}`);
            if (response.data) {
                console.log('Fetched data:', response.data); // 데이터 확인을 위한 콘솔 출력
                const conversations = response.data.map(conversation => ({
                    ...conversation,
                    date: conversation.time.split('T')[0],
                    time: conversation.time.split('T')[1]
                }));
                setConversations(conversations); // 배열로 대화 내용 설정
                setIsSelected(true);
                setSelectedDates(prevDates => [...prevDates, new Date(date)]);
                setError('');
            }
        } catch (error) {
            setIsSelected(false);
            setError('해당 날짜에 대한 대화 데이터가 존재하지 않습니다.');
        }
    };

    useEffect(() => {
        const today = new Date();
        handleDateChange(today); // 초기 로드 시 오늘 날짜로 데이터 가져오기
    }, []);

    const handleDateChange = (date) => {
        const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString()
            .split('T')[0];
        fetchConversation(formattedDate); // 선택된 날짜로 대화 내용 가져오기
    };

    return (
        <div className="flex flex-col h-screen w-screen pl-[240px] pr-10">
            <AsideForm />
            <div className="pt-28 pl-5 relative h-full">
                <div className="flex justify-between text-2xl mb-3">
                    <Calendar onDateChange={handleDateChange} selectedDates={selectedDates} />
                    <ConversationSummary conversation={conversations} />
                </div>
                {isSelected ? (
                    <div>
                        {conversations.map((conversation, index) => (
                            <ConversationContentBoard key={index} conversation={conversation} />
                        ))}
                    </div>
                ):(
                    <div className="text-center text-2xl text-gray-400">{error}</div>
                )}
            </div>
        </div>
    );
};

export default ViewConversationPage;
