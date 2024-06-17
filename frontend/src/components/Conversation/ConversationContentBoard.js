import React from 'react';

const ConversationContentBoard = ({ conversation }) => {
    const { speaker, content, time } = conversation;
    return (
        <div className={`mb-4 flex ${speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-xs px-4 py-2 bg-secondary border-2 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e] ${
                    speaker === 'user' ? 'ml-auto' : 'mr-auto'
                }`}
            >
                <p>{content}</p>
                <div className="text-right text-1xl text-gray-400">{time}</div>
            </div>
        </div>
    );
};

export default ConversationContentBoard;
