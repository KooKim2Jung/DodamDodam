import React, { useState, useEffect } from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import Modal from 'react-modal';

const ViewConversationPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState(''); // 음성 인식 결과 텍스트를 저장
    const [isDetected, setIsDetected] = useState(false); // "안녕 도담아"라는 인사말이 감지되었는지 여부

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

            if (transcript.trim() === "안녕 도담아" && !isDetected) {
                setIsDetected(true);
            } else if (isDetected) {
                setText(transcript);
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

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    let date = new Date().toISOString().split('T')[0];

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
                    <div className='mt-2 mb-2 ml-7 text-left text-2xl'>{date} 대화요약</div>
                    <div className='flex justify-center items-center mt-3'>
                        <div className='rounded-[10px] w-[450px] h-[300px] bg-white border-black border-2'></div>
                    </div>
                    <div className='justify-center items-end mt-4 mb-3'>
                        <button className='text-3xl border-2 px-7 py-2 rounded-[10px] border-black' onClick={closeModal}>확인</button>
                    </div>
                </Modal>
                <div className='mb-3 text-left text-2xl'>{date}</div>
                <div className='flex justify-end'>
                    <div className='m-5 p-5 w-auto h-auto bg-secondary border-2 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e]'>
                        <textarea readOnly
                            className='bg-transparent h-auto w-auto resize-none overflow-hidden'
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            placeholder="안녕 도담아 라고 말하면 시작합니다." 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewConversationPage;
