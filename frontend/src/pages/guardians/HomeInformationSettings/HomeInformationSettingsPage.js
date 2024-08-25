import React, { useContext } from 'react';
import Aside from '../../../components/section/Aside/Aside';
import HomeInformationBoard from '../../../components/guardians/HomeInformationSettings/HomeInformationBoard';
import { AppContext } from '../../../App';
import Guardian from '../../../components/guardians/Guardian/Guardian';

const HomeInformationSettingsPage = () => {
    const { isGuardian, setIsGuardian, isWardSetting } = useContext(AppContext);

    return (
        <div className='text-3xl w-screen'>
            <Aside/>
            <h2 className='absolute top-28 left-[265px]'>집 정보 설정</h2>
            <div className='flex justify-center pl-60 mt-36'>
                {/* <HomeInformationBoard /> */}
            </div>
            <Guardian isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>
        </div>
    );
};

export default HomeInformationSettingsPage;