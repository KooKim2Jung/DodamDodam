import React, { useEffect } from 'react';

const HomeInformationCheck = ({ isEditing, info, editInfo, infoError, setInfoError, editInfoError, setEditInfoError }) => {
    const homeInformationCheck = () => {
        if (isEditing) {
            setEditInfoError(!editInfo ? '값을 입력해 주세요.' : '')
        }
        else {
            setInfoError(!info?.data ? '값을 입력해 주세요.' : '')
        }
    }
    
    useEffect(() => {
        homeInformationCheck();
    }, [info?.data, editInfo]);

    return (
        <div className='text-2xl w-full bg-transparent rounded-[50px] text-gray-400 mb-2'>{editInfoError || infoError}</div>
    );
};

export default HomeInformationCheck;