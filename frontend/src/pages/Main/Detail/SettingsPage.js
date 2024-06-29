import React from 'react';
import DetailForm from '../../../components/detail/DetailForm';
import { useLocation } from 'react-router-dom';

const SettingsPage = () => {
    const location = useLocation();
    const hideTriangle = location.pathname === '/SettingsPage';

    return (
        <div className='Settings'> 
            <DetailForm 
                icon='./image/setting.png'
                title='맞춤 설정'
                description='피보호자의 정보를 입력해서 맞춤 서비스를 제공받을 수 있어요.'
                hideRightTriangle={hideTriangle}
                left_link='/SchedulingPage'
            />
        </div>
    );
};

export default SettingsPage;