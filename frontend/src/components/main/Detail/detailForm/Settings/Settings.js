import React from 'react';
import DetailForm from '../DetailForm';

const Settings = () => {
    return (
        <div className='Settings'> 
            <DetailForm 
                icon='./images/setting.png'
                title='맞춤 설정'
                description='피보호자의 정보를 입력하면 개인화된 맞춤형 서비스를 제공받을 수 있어요.'
                image='./images/ward_settings_image.png'
            />
        </div>
    );
};

export default Settings;
