import React from 'react';

const convertToKST = (utcTime) => {
    const date = new Date(`1970-01-01T${utcTime}Z`);
    if (isNaN(date.getTime())) {
        return 'Invalid time';
    }
    // 9시간을 밀리초 단위로 변환하여 추가
    const kstTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return kstTime.toISOString().split('T')[1].substring(0, 5); // HH:MM 형식으로 반환
};

const ConversationContentBoard = ({ conversation }) => {
    const { speaker, content, time } = conversation;
    const isDodam = speaker === 'dodam'; // 스피커가 도담인지 확인
    const kstTime = convertToKST(time); // 시간을 KST로 변환

    return (
        <div className={`mb-4 flex ${speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
            {isDodam && (
                    <div className="flex items-center mt-2 mr-2">
                        <img
                            src="./image/dodam_circle.png"
                            alt="도담"
                            className="w-[90px] h-[98px] mr-2"
                        />
                    </div>
                )}
            <div
                className={`max-w-xs px-4 py-2 bg-secondary border-2 rounded-[20px] border-black text-middle-size shadow-[3px_4px_1px_#a5996e] ${
                    speaker === 'user' ? 'ml-auto' : 'mr-auto'
                }`}
            >
                <p>{content}</p>
                <div className="text-right text-1xl text-gray-400">{kstTime}</div>
            </div>
        </div>
    );
};

export default ConversationContentBoard;
