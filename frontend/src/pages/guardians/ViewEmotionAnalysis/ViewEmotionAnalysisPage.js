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

    const testGraphs = [
        { testImage: './images/dodam_happy.png' },
        { testImage: './images/dodam_hurt.png' },
        { testImage: './images/dodam_sad.png' }
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
                const isEmotionNull = Object.values(emotionData).every(value => value === 0);
                if (isEmotionNull) {
                    setIsSelected(false);
                    setError('해당 날짜에 대한 감정 분석이 존재하지 않습니다.');
                } else {
                    setEmotionAnalysis(response.data); // 배열로 감정 분석 저장
                    setIsSelected(true);
                    setError('');
                }
            }
        } catch (error) {
            setIsSelected(false);
            setError('해당 날짜에 대한 감정 분석이 존재하지 않습니다.');
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
    };

    return (
        <div className='flex flex-col h-screen w-screen md:pl-[240px] pr-2'>
            <div className='pt-20 md:pt-28 md:pl-4 relative h-full'>
                <div className='flex justify-between text-2xl z-40'>
                    <Calendar onDateChange={handleDateChange}/>
                </div>
                {isHelpOpen && helpStep === 1 ? (<>
                    {testGraphs.map((testGraph, index) => (
                        <EmotionAnalysisGraph key={index} realKey={index} testGraph={testGraph}/>
                    ))}
                    <EmotionAnalysisBoard testEmotionAnalysis={testEmotionAnalysis}/>
                </>) : null}
                {isSelected && emotionAnalysis ? (
                    <div className='z-50 px-5 pb-5'>
                        <EmotionAnalysisGraph emotionAnalysis={emotionAnalysis} />
                        <EmotionAnalysisBoard emotionAnalysis={emotionAnalysis} date={date} />
                    </div>
                ) : (
                    <div className="text-center text-2xl text-gray-400 mt-3">{error}</div>
                )}
            </div>
        </div>
    );
};

export default ViewEmotionAnalysisPage;
