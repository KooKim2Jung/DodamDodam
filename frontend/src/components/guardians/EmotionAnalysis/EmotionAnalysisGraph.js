import React, { useContext } from 'react';
import { AppContext } from '../../../AppProvider';
import 'chart.js/auto';

const EmotionAnalysisGraph = ({ emotionAnalysis, testGraph, realKey }) => {
    const { isHelpOpen, helpStep } = useContext(AppContext);

    if (isHelpOpen && helpStep === 1 && testGraph) {

        const getHeight = (count) => {
            if (count === 0) {
                return `10px`;
            }
            return `${ count * 20}vh`;
        }

        return (
            <div className='flex items-end justify-between rounded-[15px] relative z-40'>
            {testGraph.map((item, index) => (
                <div key={index} className='flex flex-col items-center m-2'>
                    <img className='h-[70px] w-[65px] lg:h-[120px] lg:w-[110px] -mb-2' src={testGraph[index].image}/>
                    <div
                        className='w-[7vh] lg:w-[12vh] bg-secondary rounded-lg m-2 flex justify-center items-center text-white'
                        style={{
                            height: getHeight(testGraph[index].count)
                        }}
                    >
                    </div>
                    <div className={`text-center text-2xl ${helpStep === 1 ? 'text-white' : 'text-black'}`}>{testGraph[index].label}</div>
                </div>
            ))}
        </div>
        )
    }

    if (emotionAnalysis && !isHelpOpen) {

        const getHeight = (count) => {
            if (count === 0) {
                return `10px`;
            }
            return `${ count * 20}vh`;
        }

        return (
            <div className='flex items-end justify-between'>
            {emotionAnalysis.map((item, index) => (
                <div key={index} className='flex flex-col items-center m-2'>
                    <img className='h-[70px] w-[65px] lg:h-[120px] lg:w-[110px] -mb-2' src={emotionAnalysis[index].image}/>
                    <div
                        className='w-[7vh] lg:w-[12vh] bg-secondary rounded-lg m-2 flex justify-center items-center text-white'
                        style={{
                            height: getHeight(emotionAnalysis[index].count)
                        }}
                    >
                    </div>
                    <div className='text-center text-2xl text-black'>{emotionAnalysis[index].label}</div>
                </div>
            ))}
        </div>
        )
    }

    if (helpStep === 0) {
        return null; 
    }
};

export default EmotionAnalysisGraph;
