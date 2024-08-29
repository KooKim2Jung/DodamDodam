import React, { useContext } from 'react';
import { AppContext } from '../../../AppProvider';

const EmotionAnalysisGraph = ({ testGraph, realKey }) => {
    const { isHelpOpen, helpStep } = useContext(AppContext);
    
    if (isHelpOpen && helpStep === 1 && testGraph) {
        const { testImage } = testGraph;

        return (
            <div className='inline-flex justify-center items-end mt-3 mb-9 relative z-40'>
                <div className='mx-2'>
                    <img className='w-[100px]' src={testImage}/>
                    <div className={`bg-secondary w-13 mx-5 ${realKey === 0 ? 'h-[200px]' : 'h-[80px]'}`}></div>
                </div>
            </div>
        );
    }
};

export default EmotionAnalysisGraph;