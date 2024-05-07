import React from 'react';
import WardSettingsEditForm from '../../../components/WardSettings/WardSettingsEditForm';
import AsideForm from '../../../components/Aside/AsideForm';

const WardSettingsPage = () => {
    return (
        <div>
            <h2 className='absolute top-28 left-[265px] text-3xl'>피보호자 설정</h2>
            <AsideForm/>
            <div className='absolute left-72 top-[160px] flex-col text-3xl'>
                <div className='m-10 mb-20'>사진</div>
                <div className='mx-9'>이름</div>
                <div className='m-9'>성별</div>
                <div className='m-9'>나이</div>
                <div className='mt-12 mx-9 '>특이사항</div>
            </div>
            <WardSettingsEditForm/>
        </div>
    )
};

export default WardSettingsPage;