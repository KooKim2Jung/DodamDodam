import React, { useContext } from 'react';
import { Bar } from "react-chartjs-2";
import { AppContext } from '../../../AppProvider';
import 'chart.js/auto';

const EmotionAnalysisGraph = ({ emotionAnalysis, testGraph, realKey }) => {
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
        const lowerCaseAnalysis = Object.keys(emotionAnalysis).reduce((acc, key) => {
            acc[key.toLowerCase()] = emotionAnalysis[key];
            return acc;
        }, {});

        const { happy = 0, angry = 0, sad = 0, anxious = 0, hurt = 0, embarrassed = 0 } = lowerCaseAnalysis;

        const data = {
            labels: ['행복', '화남', '슬픔', '불안', '상처', '당황'],
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
                    borderWidth: 2
                }
            ]
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    position: 'top',
                    labels: {
                        font: {
                            size: 20
                        }
                }   }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 20  // x축 라벨 글씨 크기 설정
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 20  // y축 라벨 글씨 크기 설정
                        },
                        stepSize: 1
                    },
                    beginAtZero: true
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
