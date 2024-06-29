import React, { useEffect } from 'react';
import SpeechToText from '../../components/Ward/SpeechToText';

const WardPage = ({ setIsGuardian }) => {
    useEffect(() => {
        setIsGuardian(false);
    }, [setIsGuardian])

    return (
        <div>
            <SpeechToText/>
        </div>
    );
};

export default WardPage;