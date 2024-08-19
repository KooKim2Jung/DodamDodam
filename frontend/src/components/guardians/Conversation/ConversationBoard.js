import React, { useContext } from 'react';
import { AppContext } from '../../../App';

const convertToKST = (utcTime) => {
    const date = new Date(`1970-01-01T${utcTime}Z`);
    if (isNaN(date.getTime())) {
        return 'Invalid time';
    }
    // 9시간을 밀리초 단위로 변환하여 추가
    const kstTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return kstTime.toISOString().split('T')[1].substring(0, 5); // HH:MM 형식으로 반환
};

const ConversationBoard = ({ conversation, testConversation }) => {
    const { isHelpOpen, helpStep } = useContext(AppContext);

    if (isHelpOpen && helpStep === 1 || helpStep === 2 && testConversation) {
        const { talker, message, clock } = testConversation;
        const isDodam = talker === 'dodam'; 

        return (
            <div className={`flex text-left rounded-[10px] z-40 ${talker === 'user' ? 'justify-end' : 'justify-start'}`}>
                {isDodam && (
                    <div className={`relative flex mr-2 ${helpStep === 1 ? 'z-[50]' : ''}`}>
                        <img
                            src="./images/dodam_circle.png"
                            alt="도담"
                            className="w-[90px] h-[98px] -mt-1"
                        />
                    </div>
                )}
                <div className={`px-5 py-2 mb-5 bg-secondary relative border-2 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e] ${helpStep === 1 ? 'z-[50]' : ''}`}>
                    <p>{message}</p>
                    <div className="text-right text-1xl text-gray-400">{clock}</div>
                </div>
            </div>
        );
    };

    if (conversation) {
        const { speaker, content, time } = conversation;
        const isDodam = speaker === 'dodam'; 
        const kstTime = convertToKST(time); 

        return (
            <div className={`flex text-left z-40 ${speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                {isDodam && (
                    <div className={`relative flex mr-2 ${helpStep === 1 ? 'z-[50]' : ''}`}>
                        <img
                            src="./images/dodam_circle.png"
                            alt="도담"
                            className="w-[90px] h-[98px] -mt-1"
                        />
                    </div>
                )}
                <div className={`px-5 py-2 mb-5 bg-secondary relative border-2 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e] ${helpStep === 1 ? 'z-[50]' : ''}`}>
                    <p>{content}</p>
                    <div className="text-right text-1xl text-gray-400">{kstTime}</div>
                </div>
            </div>
        );
    };

};

export default ConversationBoard;
