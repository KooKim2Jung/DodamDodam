import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpeechToText = ({ conversation, setConversation }) => {
    const [text, setText] = useState(''); // 음성 인식 결과 텍스트를 저장
    const [isDetected, setIsDetected] = useState(false); // "도담아"라는 말이 감지되었는지 여부

    const [mediaRecorder, setMediaRecorder] = useState(null); // MediaRecorder 객체 저장
    const [audioChunks, setAudioChunks] = useState([]); // 녹음된 오디오 데이터 저장

    // 음성 인식 설정
    useEffect(() => {
        const recognition = new window.webkitSpeechRecognition();  // SpeechRecognition 인스턴스 생성

        recognition.continuous = true; // 연속적으로 음성 인식
        recognition.lang = 'ko-KR'; // 한국어 설정
        recognition.interimResults = true; // 임시 결과 반환

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

            if (transcript.trim() === "도담아" && !isDetected) {
                setIsDetected(true);
                startRecording(); // 녹음 시작
            } else if (isDetected) {
                setText(transcript);
                setTimeout(() => {
                    if (mediaRecorder && mediaRecorder.state === "recording") {
                        stopRecording();
                    }
                }, 5000);
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
        };

        recognition.start();

        return () => {
            recognition.abort();
        };
    }, [isDetected]);

    // 녹음 기능
    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = (event) => {
                    setAudioChunks(prevState => [...prevState, event.data]);
                };
                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
                    saveRecording(audioBlob); // 서버로 전송
                };
                recorder.start();
                setMediaRecorder(recorder);
            });
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    };

    const saveRecording = (audioBlob) => {
        const formData = new FormData();
        formData.append('voice', audioBlob);
        formData.append('content', conversation.content);
        
        axios.post('/v1/message', formData, {
        }).then(response => {
            console.log('Recording saved:', response.data);
        }).catch(error => {
            console.error('Error saving recording:', error);
        });
    };
    
    return (
        <div className='flex justify-center'>
            <textarea readOnly
                className='w-9/12 resize-none overflow-hidden absolute bottom-8 px-4 pt-3 pb-1 bg-secondary border-2 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e]'
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="'도담아' 라고 말하면 시작합니다." 
            />
        </div>
    );
};

export default SpeechToText;