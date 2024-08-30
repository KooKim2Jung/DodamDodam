import React, { useEffect, useContext } from 'react';
import { Bar } from "react-chartjs-2";
import { AppContext } from '../../../AppProvider';
import 'chart.js/auto';

const EmotionAnalysisGraph = ({ emotionAnalysis, testGraph, realKey }) => {
    const imageMap = {
        happy: new Image(),
        angry: new Image(),
        sad: new Image(),
        anxious: new Image(),
        hurt: new Image(),
        embarrassed: new Image(),
    };

    imageMap.happy.src = './images/dodam_happy.png';
    imageMap.angry.src = './images/dodam_angry.png';
    imageMap.sad.src = './images/dodam_sad.png';
    imageMap.anxious.src = './images/dodam_anxious.png';
    imageMap.hurt.src = './images/dodam_hurt';
    imageMap.embarrassed.src = './images/dodam_embarrassed.png';

    useEffect(() => {
        Object.values(imageMap).forEach(image => {
            image.onload = () => {
                console.log('Image loaded');
            };
        });
    }, []);

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

    if (emotionAnalysis) {
        const { happy, angry, sad, anxious, hurt, embarrassed } = emotionAnalysis;

        const data = {
            labels: ['Happy', 'Angry', 'Sad', 'Anxious', 'Hurt', 'embarrassed'],
            datasets: [
                {
                    label: 'Emotion Counts',
                    data: [happy, angry, sad, anxious, hurt, embarrassed],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Emotion Analysis'
                }
            }
        };

        return (
            <div className="chart-container">
                <Bar data={data} options={options} />
            </div>
        );
    }

    return null;
};

export default EmotionAnalysisGraph;