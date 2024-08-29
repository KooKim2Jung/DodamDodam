import React, { useContext } from 'react';
import EmotionAnalysisGraph from '../../../components/guardians/EmotionAnalysis/EmotionAnalysisGraph';
import EmotionAnalysisBoard from '../../../components/guardians/EmotionAnalysis/EmotionAnalysisBoard';
import Calendar from '../../../components/Calendar/Calendar';
import Guardian from '../../../components/guardians/Guardian/Guardian';
import { AppContext } from '../../../AppProvider';

const ViewEmotionAnalysisPage = () => {
    const { isGuardian, setIsGuardian, isWardSetting,
    isHelpOpen, helpStep } = useContext(AppContext);
    
    const testGraphs = [
        { testImage: './images/dodam_happy.png' },
        { testImage: './images/dodam_hurt.png' },
        { testImage: './images/dodam_sad.png' }
    ]

    const testBoard = {
        message: '가은님은 주로 행복한 감정을 많이 표현했으며, 중간에 다치고 슬펐던 순간이 있었지만 최종적으로는 다시 행복한 상태로 대화를 마무리했습니다.'
    }

    return (
        <div className='flex flex-col h-screen w-screen pl-[240px] pr-10'>
            <div className='pt-28 pl-4 relative h-full'>
                <div className='flex justify-between text-2xl z-40'>
                    <Calendar/>
                </div>
                {isHelpOpen && helpStep === 1 ? (<>
                    {testGraphs.map((testGraph, index) => (
                        <EmotionAnalysisGraph key={index} realKey={index} testGraph={testGraph}/>
                    ))}
                    <EmotionAnalysisBoard testBoard={testBoard}/>
                </>) : null}
            </div>
            <Guardian isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>
        </div>
    );
};

export default ViewEmotionAnalysisPage;
