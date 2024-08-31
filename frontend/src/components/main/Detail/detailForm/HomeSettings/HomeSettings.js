import React from 'react';
import DetailForm from '../DetailForm';

const HomeSettings = () => {
    return (
        <div>
            <DetailForm
                icon='./images/memo.png'
                title='집 정보 설정'
                description='집안의 주요 정보를 입력해서 맞춤형 서비스를 받아보세요.
                도담이가 상황에 맞춰서 실시간으로 알려줘요.'
            />
        </div>
    );
};

export default HomeSettings;