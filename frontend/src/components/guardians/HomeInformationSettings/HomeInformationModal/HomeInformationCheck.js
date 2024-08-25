import React, { useEffect } from 'react';

const HomeInformationCheck = ({ data, homeInformationError, setHomeInformationError }) => {
    const homeInformationCheck = () => {
        setHomeInformationError(!data.content ? '값을 입력해 주세요.' : '');
    }
    
    useEffect(() => {
        homeInformationCheck();
    }, [data]);

    return (
        <div className='text-2xl w-full bg-primary rounded-[50px] text-gray-400 mb-1'>{homeInformationError}</div>
    );
};

export default HomeInformationCheck;