import React from 'react';
import '../Wave.css';

const AsideForm = () => {
    return (
        <aside className='fixed left-0 top-0 h-full border-r-2 border-black z-0 bg-primary overflow-y-auto'>
            <nav className='wave flex flex-col mt-[106px]'>
                <a className='relative m-10 pt-3 text-middle-size' href='#'>대화 내용 보기</a>
                <a className='relative m-10 text-middle-size' href='#'>감정 분석 보기</a>
                <a className='relative m-10 text-middle-size' href='#'>스케줄 지정</a>
                <a className='relative m-10 text-middle-size' href='#'>도담이 설정</a>
                <a className='relative m-10 text-middle-size' href='#'>피보호자 설정</a>
            </nav>
        </aside>
    );
};

export default AsideForm;