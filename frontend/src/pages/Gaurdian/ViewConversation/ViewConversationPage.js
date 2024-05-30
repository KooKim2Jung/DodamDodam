import React, { useState } from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import SpeechToText from '../../../components/Conversation/SpeechToText';
import ConversationSummary from '../../../components/Conversation/ConversationSummary';

const ViewConversationPage = () => {
    const [conversation, setConversation] = useState({
        speaker: '',
        content: '',
        time: '',
        voice: '',
    });

    return (
        <div className='flex flex-col h-screen w-screen pl-[240px] pr-10'>
            <AsideForm />
            <div className='pt-28 pl-5 relative h-full'>
                <div className='flex justify-end text-2xl'>
                    <ConversationSummary conversation={conversation}/>
                </div>
                <div className='mb-3 text-left text-2xl'>{conversation.time}</div>
                <div >
                    <div>{conversation.speaker}</div>
                    <div>{conversation.content}</div>
                </div>
                <SpeechToText conversation={conversation} setConversation={setConversation}/>
            </div>
        </div>
    );
};

export default ViewConversationPage;
