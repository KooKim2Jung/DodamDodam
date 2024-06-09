import React, { useState } from 'react';
import AsideForm from '../../../components/Aside/AsideForm';
import ConversationSummary from '../../../components/Conversation/ConversationSummary';
import Calendar from '../../../components/Conversation/Calendar';
import ConversationContentBoard from '../../../components/Conversation/ConversationContentBoard';

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
                <div className='flex justify-between text-2xl'>
                    <Calendar />
                    <ConversationSummary conversation={conversation}/>
                </div>
                <div className='mb-3 text-left text-2xl'>{conversation.time}</div>
                <ConversationContentBoard conversation={conversation} setConversation={setConversation}/>
            </div>
        </div>
    );
};

export default ViewConversationPage;
