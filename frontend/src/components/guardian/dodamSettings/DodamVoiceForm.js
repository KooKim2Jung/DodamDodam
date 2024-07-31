import React, { useRef } from 'react';
import { FiVolume2 } from "react-icons/fi";

const DodamVoiceForm = ({ voice, setVoice, voices }) => {
    const audioRef = useRef(null);

    const voiceChange = (e) => {
        setVoice(e.target.value)
    }

    const voiceListening = () => {
        if (audioRef.current) {
            audioRef.current.load(); // 오디오 소스 데이터를 다시 로드
            // canplaythrough 이벤트 리스너를 추가. 오디오가 끝까지 재생할 수 있는 충분한 데이터를 로드 시 발생
            audioRef.current.addEventListener('canplaythrough', () => {
                audioRef.current.play();
            }, { once: true });
        }
    }

    const selectedVoice = voices.find(v => v.name === voice) // voices의 이름과 voice의 이름이 같은지 찾기

    return (
        <div>
            {voices.map((voices) => (
            <label key={voices.name}>
                <input 
                    className='ml-8 mr-3 radio-box checked:bg-secondary border-white shadow-custom1'
                    type='radio' 
                    value={voices.name} 
                    checked={voice===voices.name}
                    onChange={voiceChange}
                />{voices.name}
            </label>
            ))}
            <p className='relative top-6'>
                <div className='inline-flex items-center'>
                    {selectedVoice &&(<>
                    <audio
                        className='hidden'
                        ref={audioRef}
                        src={`${process.env.PUBLIC_URL}${selectedVoice.mp3}`}
                    />
                    <FiVolume2 className='hover:scale-110 hover:cursor-pointer' color='rgb(113, 70, 41)' size='52' onClick={voiceListening}/>
                    <input 
                        className='input-box2 w-[600px] p-3 ml-3 bg-secondary border-transparent'
                        type='text' 
                        value='안녕 나는 도담이야. 앞으로 잘 부탁해.' 
                        readOnly
                    /></>)}
                </div>
            </p>
        </div>
    );
};

export default DodamVoiceForm;