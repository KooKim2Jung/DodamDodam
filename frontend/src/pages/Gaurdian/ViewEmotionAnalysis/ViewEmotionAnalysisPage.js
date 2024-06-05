import React from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import Calender from '../../../components/EmotionAnalysis/Calendar';
import EmotionAnalysisBoard from '../../../components/EmotionAnalysis/EmotionAnalysisBoard';
import Spinner from '../../../components/EmotionAnalysis/Spinner';

const ViewEmotionAnalysisPage = () => {
    return (
        <div className='flex flex-col h-screen w-screen pl-[240px] pr-10'>
            <AsideForm/>
            <div className='pt-28 pl-5 relative h-full'>
                <div className='flex justify-between text-2xl'>
                    <Calender/>
                    <EmotionAnalysisBoard/>
                    <Spinner/>
                </div>
            </div>
        </div>
    );
};

export default ViewEmotionAnalysisPage;