import React from 'react';
import './UserHeaderForm.css';

const UserHeaderForm = () => {
    return (
        <div className='header-form'>
            <header>
                <h1 className='title'><img className='flower' src='꽃.png'></img>도담도담<img className='flower' src='꽃.png'></img></h1>
                <nav className='navigation'>
                    <a href="/LoginForm">로그아웃</a>
                    <a href="#">내 정보</a>
                </nav>
            </header>
        </div>
    );
};

export default UserHeaderForm;