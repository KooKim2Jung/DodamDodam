import React from 'react';
import AsideForm from '../../../components/section/aside/AsideForm';
import EmotionAnalysisGraph from '../../../components/guardian/emotionAnalysis/EmotionAnalysisGraph';
import EmotionAnalysisBoard from '../../../components/guardian/emotionAnalysis/EmotionAnalysisBoard';
import CalendarForm from '../../../components/calendar/CalendarForm';
import GuardianModeModalForm from '../../../components/guardian/GuardianModeModalForm';

const ViewEmotionAnalysisPage = ({ isGuardian, setIsGuardian, isWardSetting }) => {
    return (
        <div className='flex flex-col h-screen w-screen pl-[240px] pr-10'>
            <AsideForm/>
            <div className='pt-28 pl-5 relative h-full'>
                <div className='flex justify-between text-2xl'>
                    <CalendarForm/>
                </div>
                <EmotionAnalysisGraph/>
                <EmotionAnalysisBoard/>
            </div>
            <GuardianModeModalForm isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>
        </div>
    );
};

export default ViewEmotionAnalysisPage;