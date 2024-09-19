import React, { useContext, useState, useEffect } from 'react';
import ConversationSummary from '../../../components/guardians/Conversation/ConversationSummary';
import Calendar from '../../../components/Calendar/Calendar';
import ConversationBoard from '../../../components/guardians/Conversation/ConversationBoard';
import api from '../../../Service/Api';
import { AppContext } from '../../../AppProvider';

const ViewConversationPage = () => {
    const { isHelpOpen, helpStep } = useContext(AppContext);
    
    const [conversations, setConversations] = useState([]);
    const [summary, setSummary] = useState('');
    const [isSelected, setIsSelected] = useState(true);
    // const [selectedDates, setSelectedDates] = useState([]);
    const [error, setError] = useState('');

    const testConversations = [
        { talker: 'user', message: '도담아 안녕', clock: '16:19' }, 
        { talker: 'dodam', message: '안녕 가은아! 무슨 일 있어?', clock: '16:19' },
        { talker: 'user', message: '친구들이랑 그네타고 미끄럼틀타다가 넘어졌어', clock: '16:20' },
        { talker: 'dodam', message: '괜찮아? 많이 다치지는 않았어?', clock: '16:20' },
        { talker: 'user', message: '많이 아파서 울었는데 이제 괜찮아', clock: '16:21' },
        { talker: 'dodam', message: '다행이다~ 그래도 부모님께 꼭 말씀드려~', clock: '16:21' },
        { talker: 'user', message: '알겠어', clock: '16:22' },
        { talker: 'dodam', message: '다른 일은 없었어?', clock: '16:22' },
        { talker: 'user', message: '친구들이랑 좋아하는 떡볶이도 먹어서 기분이 좋아졌어!', clock: '16:22' },
        { talker: 'dodam', message: '오~ 떡볶이 좋아하는구나! 맛있었겠다~', clock: '16:22' },
        { talker: 'user', message: '응 또 부를게', clock: '16:22' },
        { talker: 'dodam', message: '그래~ 필요하면 또 불러줘^^', clock: '16:22' },
    ]

    const testSummary = {
        message: '가은님은 오늘 친구들과 그네를 타고 미끄럼틀을 타다가 넘어져서 많이 아파 울었지만, 이제는 괜찮아졌습니다. 이후 좋아하는 떡볶이를 먹고 기분이 좋아졌습니다.'
    };

    // 특정 날짜에 대한 대화 내용 가져오기
    const getConversation = async (date) => { 
        try {
            const response = await api.get(`/v1/conversation/${date}`);
            console.log(response.data)
            if (response.data) {
                const conversations = response.data.map(conversation => ({ // speaker, content, voice, time을 복사
                    ...conversation,
                    date: conversation.time.split('T')[0], // 날짜 부분 저장
                    time: conversation.time.split('T')[1].split(':').slice(0,2).join(':'), // 시간 저장
                }));
                setConversations(conversations); // 배열로 대화 내용 설정
                setIsSelected(true);
                setError('');
            } 
        } catch (error) {
            setIsSelected(false);
            setError('해당 날짜에 대한 대화 데이터가 존재하지 않아요.');
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
            setSummary('해당 날짜에 대한 대화 요약이 존재하지 않아요.');
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
        <div className="flex flex-col h-screen w-screen md:pl-[248px] overflow-hidden">
            <div className="pt-20 md:pt-28 relative h-full w-full">
                <div className="flex fixed top-[60px] w-full p-[13px_5px_3px_5px] md:top-[92px] md:w-[calc(100%-247px)] justify-between text-2xl z-50">
                    <Calendar onDateChange={handleDateChange} />
                    {isHelpOpen && helpStep === 2 ? (
                        <ConversationSummary testSummary={testSummary} />
                    ) : (
                        <ConversationSummary summary={summary} />
                    )}
                </div>
                <div className='mt-9 z-50 h-[calc(100vh-100px)] md:h-[calc(100vh-130px)] py-4 overflow-y-auto px-2'>
                    {isHelpOpen ? (
                        testConversations.map((testConversation, index) => (
                            <ConversationBoard key={index} testConversation={testConversation} />
                        ))
                    ) : (<>
                        {isSelected && conversations ? (
                            conversations.map((conversation, index) => (
                                <ConversationBoard key={index} conversation={conversation} />
                            ))
                        ) : (<>
                            <div className='flex justify-center mb-2'><img className='h-[120px] w-[105px]' src='./images/dodam_nodata.png'/></div>
                            <div className="text-center text-2xl text-gray-400">{error}</div>
                        </>)}
                    </>)}
                </div>
            </div>
        </div>
    );
};

export default ViewConversationPage;

