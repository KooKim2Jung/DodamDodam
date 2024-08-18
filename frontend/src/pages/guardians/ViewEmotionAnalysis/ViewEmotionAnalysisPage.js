import React, { useContext } from 'react';
import Aside from '../../../components/section/Aside/Aside';
import EmotionAnalysisGraph from '../../../components/guardians/EmotionAnalysis/EmotionAnalysisGraph';
import EmotionAnalysisBoard from '../../../components/guardians/EmotionAnalysis/EmotionAnalysisBoard';
import Calendar from '../../../components/Calendar/Calendar';
import Guardian from '../../../components/guardians/Guardian/Guardian';
import { AppContext } from '../../../App';

const ViewEmotionAnalysisPage = () => {
    const { isGuardian, setIsGuardian, isWardSetting } = useContext(AppContext);
    
    return (
        <div className='flex flex-col h-screen w-screen pl-[240px] pr-10'>
            <Aside/>
            <div className='pt-28 pl-4 relative h-full'>
                <div className='flex justify-between text-2xl'>
                    <Calendar/>
                </div>
                <EmotionAnalysisGraph/>
                <EmotionAnalysisBoard/>
            </div>
            <Guardian isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>
        </div>
    );
};

export default ViewEmotionAnalysisPage;
