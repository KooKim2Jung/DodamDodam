import React, { useRef } from 'react';

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
        <div>{voices.map((voices) => (
            <label key={voices.name}>
                <input className='ml-8 mr-3 radio-box'
                    type='radio' 
                    value={voices.name} 
                    checked={voice===voices.name}
                    onChange={voiceChange}/>{voices.name}
            </label>
            ))}
            <p className='relative top-6 bg-red-30'>
                <div className='inline-flex items-center'>
                    {selectedVoice &&(<><audio controls 
                    className='relative -left-3 w-0 h-0 border-t-[20px] border-t-transparent 
                    border-b-[20px] border-b-transparent border-l-[30px] border-l-borderColor drop-shadow-[1px_4px_1px_#c0c0c0]'
                    type='audio/mp3'
                    ref={audioRef}
                    src={`${process.env.PUBLIC_URL}${selectedVoice.mp3}`}
                    onClick={voiceListening}
                    />
                    <input className='input-box2 w-[600px] p-3 mr-2'
                        type='text' 
                        value='안녕 나는 도담이야. 앞으로 잘 부탁해.' 
                    /></>)}
                </div>
            </p>
        </div>
    );
};

export default DodamVoiceForm;