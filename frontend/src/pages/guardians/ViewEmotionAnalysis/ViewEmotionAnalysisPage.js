import React, { useState, useEffect, useContext } from 'react';
import EmotionAnalysisGraph from '../../../components/guardians/EmotionAnalysis/EmotionAnalysisGraph';
import EmotionAnalysisBoard from '../../../components/guardians/EmotionAnalysis/EmotionAnalysisBoard';
import Calendar from '../../../components/Calendar/Calendar';
import { AppContext } from '../../../AppProvider';
import api from '../../../Service/Api';

const ViewEmotionAnalysisPage = () => {
    const { isHelpOpen, helpStep } = useContext(AppContext);

    const [emotionAnalysis, setEmotionAnalysis] = useState(null);
    const [isSelected, setIsSelected] = useState(true);
    const [date, setDate] = useState('');
    const [error, setError] = useState('');

    const dodamGraph = [
        { label: '행복', image: './images/dodam_happy.png', count: 0 },
        { label: '화남', image: './images/dodam_angry.png', count: 0 },
        { label: '슬픔', image: './images/dodam_sad.png', count: 0 },
        { label: '불안', image: './images/dodam_anxious.png', count: 0 },
        { label: '상처', image: './images/dodam_hurt.png', count: 0 },
        { label: '당황', image: './images/dodam_embarrassed.png', count: 0 },
    ]

    const testGraph = [
        { label: '행복', image: './images/dodam_happy.png', count: 2 },
        { label: '화남', image: './images/dodam_angry.png', count: 0 },
        { label: '슬픔', image: './images/dodam_sad.png', count: 1 },
        { label: '불안', image: './images/dodam_anxious.png', count: 0 },
        { label: '상처', image: './images/dodam_hurt.png', count: 1 },
        { label: '당황', image: './images/dodam_embarrassed.png', count: 0 },
    ]

    const testEmotionAnalysis = {
        message: '가은님은 주로 행복한 감정을 많이 표현했으며, 중간에 다치고 슬펐던 순간이 있었지만 최종적으로는 다시 행복한 상태로 대화를 마무리했습니다.'
    }

    // 특정 날짜에 대한 감정 분석 가져오기
    const getEmotionAnalysis = async (date) => { 
        try {
            const response = await api.get(`/v1/emotions/?date=${date}`);
            if (response.data) {
                const emotionData = response.data;
                dodamGraph[0].count = emotionData.Happy;
                dodamGraph[1].count = emotionData.Angry;
                dodamGraph[2].count = emotionData.Sad;
                dodamGraph[3].count = emotionData.Anxious;
                dodamGraph[4].count = emotionData.Hurt;
                dodamGraph[5].count = emotionData.Embarrassed;
                const isEmotionNull = Object.values(emotionData).every(value => value === 0);
                if (isEmotionNull) {
                    setIsSelected(false);
                    setError('해당 날짜에 대한 감정 분석이 존재하지 않아요.');
                } else {
                    setEmotionAnalysis(dodamGraph); // 배열로 감정 분석 저장
                    setIsSelected(true);
                    setError('');
                }
            }
        } catch (error) {
            setIsSelected(false);
            setError('해당 날짜에 대한 감정 분석이 존재하지 않아요.');
        }
    };

    // 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 두 자리 숫자로
        const day = String(date.getDate()).padStart(2, '0'); // 일을 두 자리 숫자로
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const today = formatDate(new Date());
        setDate(today);
        handleDateChange(today); // 초기 로드 시 오늘 날짜로 데이터 가져오기
    }, []);

    const handleDateChange = (date) => {
        const formattedDate = formatDate(new Date(date));
        getEmotionAnalysis(formattedDate); // 선택된 날짜로 감정 분석 가져오기
        setDate(formattedDate);
    };

    return (
        <div className='flex flex-col h-screen w-screen md:pl-[248px] overflow-hidden'>
            <div className='pt-20 md:pt-28 relative h-full w-full'>
                <div className='flex fixed top-[60px] w-full p-[13px_5px_3px_5px] md:top-[92px] md:w-[calc(100%-239px)] justify-between text-2xl z-50'>
                    <Calendar onDateChange={handleDateChange}/>
                </div>
                <div className='mt-9 z-50 h-[calc(100vh-100px)] md:h-[calc(100vh-130px)] py-4 overflow-y-auto px-2'>
                    {isHelpOpen ? (
                        <div className='z-50 px-5 pb-5'>
                            <EmotionAnalysisGraph testGraph={testGraph}/>
                            <EmotionAnalysisBoard testEmotionAnalysis={testEmotionAnalysis}/>
                        </div>
                    ) : (<>
                        {isSelected && emotionAnalysis ? (
                            <div className='z-50 px-5 pb-5'>
                                <EmotionAnalysisGraph emotionAnalysis={emotionAnalysis} />
                                {/* <EmotionAnalysisBoard emotionAnalysis={emotionAnalysis} date={date} /> */}
                            </div>
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

export default ViewEmotionAnalysisPage;
