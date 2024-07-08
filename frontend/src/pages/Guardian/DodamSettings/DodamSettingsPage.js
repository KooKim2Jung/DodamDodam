import React, { useState, useEffect }  from 'react';
import AsideForm from '../../../components/section/aside/AsideForm';
import api from '../../../services/Api';
import DodamVoiceForm from '../../../components/guardian/dodamSettings/DodamVoiceForm';
import GuardianModeModalForm from '../../../components/guardian/GuardianModeModalForm';

const DodamSettingsPage = ({ isGuardian, setIsGuardian, isWardSetting }) => {
    const [voice, setVoice] = useState('다정');
    const voices = [
        { name: "다정", mp3: '/mp3/Dajeong.mp3'}, // 하준
        { name: "씩씩", mp3: '/mp3/Ssikssik.mp3'}, // 다인
        { name: "활발", mp3: '/mp3/Hwalbal.mp3'}, // 야옹
        { name: "명랑", mp3: '/mp3/Myeonglang.mp3'}, // 가람
    ];

    // 서버에 저장된 도담이 목소리 가져오기
    const getDodamVoice = async () => {
        try {
            const response = await api.get('/v1/setting');
            return response.data;  // { voice: '...' } 형태로 반환
        } catch (error) {
            console.error('도담이 정보 보기 요청 오류', error);
        }
    };

    // 도담이 목소리 수정하기
    const saveDodamVoice = async (voice) => {
        try {
            const response = await api.put('/v1/setting', { voice });
            alert(response.data);  
        } catch (error) {
            console.error('도담이 정보 수정 요청 오류', error);
            alert('도담이 정보 수정에 실패하였습니다.');
        }
    };

    useEffect(() => {
        const loadSettings = async () => {
            const settings = await getDodamVoice();
            if (settings) {
                setVoice(settings.voice);
            }
        };
        loadSettings();
    }, []);

    const voiceSetting = () => {
        saveDodamVoice(voice);
    };

    return (
        <div className='flex flex-col h-screen w-screen pl-[240px]'>
            <AsideForm/>
            <div className='pt-28 pl-5'>
                <h2 className='text-3xl text-left'>도담이 목소리</h2>
                <div className='flex justify-center relative -top-8'>
                    <img className='relative h-60 w-56 m-10' src='./images/dodam_circle.png'/>
                </div>
                <div className="text-3xl relative -top-11">
                    <DodamVoiceForm voice={voice} setVoice={setVoice} voices={voices} />
                    <button className='input-box2 relative p-2 w-40 top-14 hover:scale-110 bg-secondary border-transparent' onClick={voiceSetting}>확인</button>
                </div>
            </div>
            <GuardianModeModalForm isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>
        </div>
    );
};

export default DodamSettingsPage;