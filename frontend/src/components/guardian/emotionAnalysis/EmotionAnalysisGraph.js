import React from 'react';

const EmotionAnalysisGraph = () => {
    return (
        <div className='flex justify-center items-end mt-3 mb-9'>
        {/*happy*/}
        <div className='mx-2'>
            <img className='w-[100px]' src='./image/dodam_happy.png'/>
            <div className='bg-secondary w-13 h-[220px] mx-5'></div>
        </div>
        {/*hurt*/}
        <div className='mx-2'>
            <img className='w-[100px]' src='./image/dodam_hurt.png'/>
            <div className='bg-secondary w-13 h-[80px] mx-5'></div>
        </div>
        {/*sad*/}
        <div className='mx-2'>
            <img className='w-[100px]' src='./image/dodam_sad.png'/>
            <div className='bg-secondary w-13 h-[80px] mx-5'></div>
        </div>
       
        </div>
    );
};

export default EmotionAnalysisGraph;