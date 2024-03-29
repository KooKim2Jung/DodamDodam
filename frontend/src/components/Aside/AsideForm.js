import React from 'react';
import './AsideForm.css';

const AsideForm = () => {
    return (
        <div className='aside-form'>
            <aside>
                <nav className='navigation'>
                    <a href='#'>대화 내용 보기</a>
                    <a href='#'>감정 분석 보기</a>
                    <a href='#'>스케줄 지정</a>
                    <a href='#'>도담이 설정</a>
                    <a href='#'>피보호자 설정</a>
                </nav>
            </aside>
        </div>
    );
};

export default AsideForm;