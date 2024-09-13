import React, { useContext } from 'react';
import { AppContext } from '../../../AppProvider';

const EmotionAnalysisBoard = ({ emotionAnalysis, testEmotionAnalysis, date }) => {
    const { isHelpOpen, helpStep } = useContext(AppContext);

    if (isHelpOpen && helpStep === 1 && testEmotionAnalysis) {
        return (
            <div className='flex justify-center items-center relative z-40'>
                <div className='bg-white border-2 border-black w-full px-4 py-4 rounded-[15px] text-2xl text-left'>
                <p>2024년 1월 1일</p>전체적인 감정 분석: 가은님은 주로 행복한 감정을 많이 표현했으며, 중간에 다치고 슬펐던 순간이 있었지만 최종적으로는 다시 행복한 상태로 대화를 마무리했습니다.
                </div>
            </div>
        );
    }

    if (emotionAnalysis && !isHelpOpen) {
        const handleDate = (oldDate) => {
            const [year, month, day] = oldDate.split('-');
            return `${year}년 ${month}월 ${day}일`;
        }

        const { total } = emotionAnalysis;
        const newDate = handleDate(date);

        return (
            <div className='flex justify-center items-center relative z-40'>
                <div className='bg-white border-2 border-black w-full px-4 py-4 rounded-[15px] text-2xl text-left'>
                <p>{newDate}</p><p>전체적인 감정 분석:</p>{total}
                </div>
            </div>
        );
    }

    if (helpStep === 0) {
        return null; 
    }
};

export default EmotionAnalysisBoard;