import React, { useContext } from 'react';
import AsideForm from '../../../components/section/aside/AsideForm';
import EmotionAnalysisGraph from '../../../components/guardian/emotionAnalysis/EmotionAnalysisGraph';
import EmotionAnalysisBoard from '../../../components/guardian/emotionAnalysis/EmotionAnalysisBoard';
import CalendarModalForm from '../../../components/calendar/CalendarModalForm';
import GuardianModeModalForm from '../../../components/guardian/GuardianModeModalForm';
import { AppContext } from '../../../App';

const ViewEmotionAnalysisPage = () => {
    const { isGuardian, setIsGuardian, isWardSetting } = useContext(AppContext);
    
    return (
        <div className='flex flex-col h-screen w-screen pl-[240px] pr-10'>
            <AsideForm/>
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