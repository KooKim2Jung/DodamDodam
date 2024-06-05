import React, { useState, useEffect, useRef }  from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import api from '../../../services/Api';

const DodamSettingsPage = () => {
    const audioRef = useRef(null);
    const [voice, setVoice] = useState('다정');
    const voices = [
        { name: "다정", mp3: '/mp3/Dajeong.mp3'}, //하준
        { name: "씩씩", mp3: '/mp3/Ssikssik.mp3'}, //다인
        { name: "활발", mp3: '/mp3/Hwalbal.mp3'}, //야옹
        { name: "명랑", mp3: '/mp3/Myeonglang.mp3'}, //가람
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

    const voiceChange = (e) => {
        setVoice(e.target.value)
    }

    const voiceSetting = () => {
        saveVoiceSetting(voice);
    };

    const voiceListening = () => {
        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.addEventListener('canplaythrough', () => {
                audioRef.current.play();
            }, { once: true });
        }
    }

    const selectedVoice = voices.find(v => v.name === voice)

    return (
        <div className='flex flex-col h-screen w-screen pl-[240px]'>
            <AsideForm/>
            <div className='pt-28 pl-5'>
                <h2 className='text-3xl text-left'>도담이 목소리</h2>
                <div className='flex justify-center relative -top-8'>
                    <img className='relative h-64 w-60 m-10' src='./image/dodam_circle.png'/>
                </div>
                <div className="text-3xl relative -top-9">
                    <React.Fragment>
                        {voices.map((voices) => (
                            <label key={voices.name}>
                                <input className='ml-8 mr-3 radio-box'
                                    type='radio' 
                                    value={voices.name} 
                                    checked={voice===voices.name}
                                    onChange={voiceChange}/>{voices.name}
                            </label>
                        ))}<p className='relative top-5 bg-red-30'>
                        <div className='inline-flex items-center'>
                            {selectedVoice &&(<><audio controls 
                            className='relative -left-3 w-0 h-0 border-t-[20px] border-t-transparent 
                            border-b-[20px] border-b-transparent border-l-[30px] border-l-borderColor drop-shadow-[1px_4px_1px_#c0c0c0]'
                            type='audio/mp3'
                            ref={audioRef}
                            src={`${process.env.PUBLIC_URL}${selectedVoice.mp3}`}
                            onClick={voiceListening}
                            />
                            <input 
                                className='input-box2 w-[600px] p-3 mr-2'
                                type='text' value='안녕 나는 도담이야. 앞으로 잘 부탁해.' 
                            /></>)}
                        </div>
                        <p><button className='input-box2 relative p-2 w-40 top-5' onClick={voiceSetting}>확인</button></p>
                        </p>
                    </React.Fragment>
                </div>
            </div>
        </div>
    );
};

export default DodamSettingsPage;