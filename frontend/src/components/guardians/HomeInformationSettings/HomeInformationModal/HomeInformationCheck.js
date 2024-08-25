import React, { useEffect } from 'react';

const HomeInformationCheck = ({ data, homeInformationError, setHomeInformationError }) => {
    const homeInformationCheck = () => {
        setHomeInformationError(!data.content ? '값을 입력해 주세요.' : '');
    }
    
    useEffect(() => {
        homeInformationCheck();
    }, [data]);

    return (
        <div className='text-2xl bg-primary rounded-[70px] text-gray-400'>{homeInformationError}</div>
    );
};

export default HomeInformationCheck;