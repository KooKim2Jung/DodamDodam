import React from 'react';
import DetailForm from '../DetailForm';

const HomeSettings = () => {
    return (
        <div>
            <DetailForm
                icon='./images/memo.png'
                title='집 정보 설정'
                description='집안의 주요 정보를 입력하면 도담이가 상황에 맞춰 실시간으로 알려줘요.'
                image='./images/home_settings_image.png'
            />
        </div>
    );
};

export default HomeSettings;