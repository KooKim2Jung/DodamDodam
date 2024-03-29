import React from 'react';
import './HeaderForm.css';

const UserHeaderForm = () => {
    return (
        <div className='header-form'>
            <header>
                <h1 className='title'><img className='flower' src='./image/title_flower.png'>
                    </img><a href="/">도담도담</a><img className='flower' src='./image/title_flower.png'></img></h1>
                <nav className='navigation'>
                    <a href="/LoginPage">로그아웃</a>
                    <a href="#">내 정보</a>
                </nav>
            </header>
        </div>
    );
};

export default UserHeaderForm;