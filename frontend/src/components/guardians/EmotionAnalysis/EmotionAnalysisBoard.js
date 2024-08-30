import React, { useContext } from 'react';
import { AppContext } from '../../../AppProvider';

const EmotionAnalysisBoard = ({ emotionAnalysis, testEmotionAnalysis, date }) => {
    const { isHelpOpen, helpStep } = useContext(AppContext);

    if (isHelpOpen && helpStep === 1 && testEmotionAnalysis) {
        return (
            <div className='flex justify-center items-center relative z-40'>
                <div className='bg-white border-2 border-black w-[600px] px-4 py-4 rounded-[15px] text-2xl text-left'>
                <p>2024-01-01</p><p>전체적인 감정 분석:</p>가은님은 주로 행복한 감정을 많이 표현했으며, 중간에 다치고 슬펐던 순간이 있었지만 최종적으로는 다시 행복한 상태로 대화를 마무리했습니다.
                </div>
            </div>
        );
    }

    if (emotionAnalysis) {
        const { total } = emotionAnalysis;

        return (
            <div className='flex justify-center items-center relative z-40'>
                <div className='bg-white border-2 border-black w-[600px] px-4 py-4 rounded-[15px] text-2xl text-left'>
                <p>{date}</p><p>전체적인 감정 분석:</p>{total}
                </div>
            </div>
        );
    }
};

export default EmotionAnalysisBoard;