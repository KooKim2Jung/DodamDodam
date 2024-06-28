import React, { useState, useEffect }  from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import api from '../../../services/Api';
import DodamVoiceForm from '../../../components/DodamSettings/DodamVoiceForm';

const DodamSettingsPage = () => {
    const [voice, setVoice] = useState('다정');
    const voices = [
        { name: "다정", mp3: '/mp3/Dajeong.mp3'}, // 하준
        { name: "씩씩", mp3: '/mp3/Ssikssik.mp3'}, // 다인
        { name: "활발", mp3: '/mp3/Hwalbal.mp3'}, // 야옹
        { name: "명랑", mp3: '/mp3/Myeonglang.mp3'}, // 가람
    ];

    // 서버에서 현재 목소리 설정을 가져오는 함수
    const fetchVoiceSetting = async () => {
        try {
            const response = await api.get('/v1/setting');
            return response.data;  // { voice: '...' } 형태로 반환
        } catch (error) {
            console.error('Error fetching voice setting:', error);
        }
    };

    // 목소리 설정을 서버에 저장하는 함수
    const saveVoiceSetting = async (voice) => {
        try {
            const response = await api.post('/v1/setting', { voice });
            alert(response.data);  // 서버로부터의 응답 메시지를 alert로 표시
        } catch (error) {
            console.error('Error saving voice setting:', error);
            alert('설정 저장 실패');
        }
    };

    useEffect(() => {
        const loadSettings = async () => {
            const settings = await fetchVoiceSetting();
            if (settings) {
                setVoice(settings.voice);
            }
        };
        loadSettings();
    }, []);

    const voiceSetting = () => {
        saveVoiceSetting(voice);
    };

    return (
        <div className='flex flex-col h-screen w-screen pl-[240px]'>
            <AsideForm/>
            <div className='pt-28 pl-5'>
                <h2 className='text-3xl text-left'>도담이 목소리</h2>
                <div className='flex justify-center relative -top-6'>
                    <img className='relative h-64 w-60 m-10' src='./image/dodam_circle.png'/>
                </div>
                <div className="text-3xl relative -top-8">
                    <DodamVoiceForm voice={voice} setVoice={setVoice} voices={voices} />
                    <button className='input-box2 relative p-2 w-40 top-14' onClick={voiceSetting}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default DodamSettingsPage;