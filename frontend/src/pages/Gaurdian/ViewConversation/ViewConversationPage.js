import React, { useState, useEffect } from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import ConversationSummary from '../../../components/Conversation/ConversationSummary';
import Calendar from '../../../components/Calendar/Calendar';
import ConversationContentBoard from '../../../components/Conversation/ConversationContentBoard';
import api from '../../../services/Api';

const ViewConversationPage = () => {
    const [conversations, setConversations] = useState([]);
    const [summary, setSummary] = useState('');
    const [isSelected, setIsSelected] = useState(true);
    // const [selectedDates, setSelectedDates] = useState([]);
    const [error, setError] = useState('');

    // 특정 날짜에 대한 대화 내용 가져오기
    const getConversation = async (date) => { 
        try {
            const response = await api.get(`/v1/conversation/${date}`);
            if (response.data) {
                const conversations = response.data.map(conversation => ({ // speaker, content, voice, time을 복사
                    ...conversation,
                    date: conversation.time.split('T')[0], // 날짜 부분 저장
                    time: conversation.time.split('T')[1] // 시간 부분 저장
                }));
                setConversations(conversations); // 배열로 대화 내용 설정
                setIsSelected(true);
                setError('');
            } 
        } catch (error) {
            setIsSelected(false);
            setError('해당 날짜에 대한 대화 데이터가 존재하지 않습니다.');
        }
    };

    // 특정 날짜에 대한 대화 요약 가져오기
    const getConversationSummary = async (date) => {
        try {
            const response = await api.get(`/v1/conversation/summary/${date}`);
            if (response.data) {
                setSummary(response.data.summary); // 요약 내용을 상태에 저장
            }
        } catch (error) {
            setSummary('해당 날짜에 대한 대화 요약이 존재하지 않습니다.');
        }
    }

     // 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 두 자리 숫자로
        const day = String(date.getDate()).padStart(2, '0'); // 일을 두 자리 숫자로
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const today = formatDate(new Date());
        handleDateChange(today); // 초기 로드 시 오늘 날짜로 데이터 가져오기
    }, []);

    const handleDateChange = (date) => {
        const formattedDate = formatDate(new Date(date));
        getConversation(formattedDate); // 선택된 날짜로 대화 내용 가져오기
        getConversationSummary(formattedDate); // 선택된 날짜로 대화 요약 가져오기
    };

    return (
        <div className="flex flex-col h-screen w-screen pl-[240px] pr-5">
            <AsideForm />
            <div className="pt-28 pl-5 relative h-full">
                <div className="flex justify-between text-2xl mb-3">
                    <Calendar onDateChange={handleDateChange}  />
                    <ConversationSummary summary={summary} />
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
