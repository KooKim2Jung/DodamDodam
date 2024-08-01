import React, { useContext } from 'react';
import Aside from '../../../components/section/Aside/Aside';
import EmotionAnalysisGraph from '../../../components/guardian/EmotionAnalysis/EmotionAnalysisGraph';
import EmotionAnalysisBoard from '../../../components/guardian/EmotionAnalysis/EmotionAnalysisBoard';
import CalendarModalForm from '../../../components/Calendar/CalendarModalForm';
import GuardianModeModalForm from '../../../components/guardian/Guardian/GuardianModeModalForm';
import { AppContext } from '../../../App';

const ViewEmotionAnalysisPage = () => {
    const { isGuardian, setIsGuardian, isWardSetting } = useContext(AppContext);
    
    return (
        <div className='flex flex-col h-screen w-screen pl-[240px] pr-10'>
            <Aside/>
            <div className='pt-28 pl-5 relative h-full'>
                <div className='flex justify-between text-2xl'>
                    <CalendarModalForm/>
                </div>
                <EmotionAnalysisGraph/>
                <EmotionAnalysisBoard/>
            </div>
            <GuardianModeModalForm isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>
        </div>
    );
};

export default ViewEmotionAnalysisPage;
