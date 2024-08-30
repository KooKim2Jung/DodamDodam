import React, { useContext } from 'react';
import { AppContext } from '../../../AppProvider';

const ConversationBoard = ({ conversation, testConversation }) => {
    const { isHelpOpen, helpStep } = useContext(AppContext);

    if (isHelpOpen && helpStep === 1 || helpStep === 2 && testConversation) {
        const { talker, message, clock } = testConversation;
        const isDodam = talker === 'dodam';

        return (
            <div className={`flex text-left z-40 ${talker === 'user' ? 'justify-end' : 'justify-start'}`}>
                {isDodam && (
                    <div className={`relative flex items-center -mt-4 mx-2 ${helpStep === 1 ? 'z-[50]' : ''}`}>
                        <img
                            src="./images/dodam_circle.png"
                            alt="도담"
                            className="hidden lg:block lg:w-[90px] lg:h-[98px]"
                        />
                    </div>
                )}
                <div className={`px-5 py-2 mb-5 h-full max-w-screen-sm bg-secondary relative border-2 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e] ${helpStep === 1 ? 'z-[50]' : ''}`}>
                    <p>{message}</p>
                    <div className="text-right text-1xl text-gray-400">{clock}</div>
                </div>
            </div>
        );
    };

    if (conversation) {
        const handleDate = (oldDate) => {
            const [year, month, day] = oldDate.split('-');
            return `${year}년 ${month}월 ${day}일`
        }

        const { speaker, content, date, time } = conversation;
        const isDodam = speaker === 'dodam';
        const newDate = handleDate(date);

        return (
            <div className={`flex items-center text-left z-40 ${speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                {isDodam && (
                    <div className={`relative flex items-center -mt-4 mx-2 ${helpStep === 1 ? 'z-[50]' : ''}`}>
                        <img
                            src="./images/dodam_circle.png"
                            alt="도담"
                            className="hidden lg:block lg:w-[90px] lg:h-[98px]"
                        />
                    </div>
                )}
                <div className={`px-5 py-2 mb-5 h-full max-w-screen-sm bg-secondary relative border-2 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e] ${helpStep === 1 ? 'z-[50]' : ''}`}>
                    <p>{content}</p>
                    <div className="text-right text-1xl text-gray-400">{newDate} {time}</div>
                </div>
            </div>
        );
    };

};

export default ConversationBoard;
