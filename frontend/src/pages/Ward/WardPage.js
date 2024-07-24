import React, { useContext, useEffect } from 'react';
import SpeechToText from '../../components/ward/SpeechToText';
import { AppContext } from '../../App';

const WardPage = () => {
    const { setIsGuardian } = useContext(AppContext);
    
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