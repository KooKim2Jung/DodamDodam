import React, { useState, useEffect } from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import Modal from 'react-modal';
import api from '../../../services/Api';
import axios from 'axios';

const ViewConversationPage = () => {
    const [text, setText] = useState(''); // 음성 인식 결과 텍스트를 저장
    const [isDetected, setIsDetected] = useState(false); // "도담아"라는 말이 감지되었는지 여부

    const [mediaRecorder, setMediaRecorder] = useState(null); // MediaRecorder 객체 저장
    const [audioChunks, setAudioChunks] = useState([]); // 녹음된 오디오 데이터 저장

    const [conversation, setConversation] = useState({
        speaker: '',
        content: '',
        time: '',
        voice: '',
    });

    const [isOpen, setIsOpen] = useState(false);

    const fetchConversation = async (date) => { // 특정 날짜에 대한 대화 내용 가져오기
        try {
            const response = await api.get(`/v1/conversation/${date}`);
            if (response.data) {
                const { speaker, content, time, voice } = response.data;
                console.log('Received date from server:', time);
                if (/^\d{4}-\d{2}-\d{2}$/.test(time)) { // 날짜 형식 확인
                    setConversation({
                        speaker: speaker,
                        content: content,
                        time: time,
                        voice: voice,
                    });
                } else {
                    console.error(response.data);
                }
            }
        } catch (error) {
            console.error('Error fetching view conversation:', error);
        }
    }
    
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        fetchConversation(today);
    }, []);

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
                if (event.results[0].isFinal) {
                    stopRecording(); // 녹음 종료
                }
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

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className='flex flex-col h-screen w-screen pl-[240px]'>
            <AsideForm />
            <div className='pt-28 pl-5'>
                <div className='flex justify-end relative -left-3 text-2xl'>
                    <button onClick={openModal}>대화요약 보기</button>
                </div>
                <Modal 
                    overlayClassName="fixed mt-20 z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center" 
                    isOpen={isOpen} 
                    onRequestClose={closeModal}
                    className='w-[500px] h-[440px] bg-primary rounded-[10px]'
                >
                    <div className='mt-2 mb-2 ml-7 text-left text-2xl'>{conversation.time}대화요약</div>
                    <div className='flex justify-center items-center mt-3'>
                        <div className='rounded-[10px] w-[450px] h-[300px] bg-white border-black border-2'></div>
                    </div>
                    <div className='justify-center items-end mt-4 mb-3'>
                        <button className='text-3xl border-2 px-7 py-2 rounded-[10px] border-black' onClick={closeModal}>확인</button>
                    </div>
                </Modal>
                <div className='mb-3 text-left text-2xl'>{conversation.time}</div>
                <div className='flex justify-end'>
                    <div>{conversation.speaker}</div>
                    <div>{conversation.content}</div>
                    <div className='items-end m-5 p-5 w-1/2 bg-secondary border-2 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e]'>
                        <textarea readOnly
                            className='bg-transparent w-full resize-none overflow-hidden'
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            placeholder="'도담아' 라고 말하면 시작합니다." 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewConversationPage;
