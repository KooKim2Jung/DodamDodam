import React from 'react';
import './NonUserHeaderForm.css';

const NonUserHeaderForm = () => {
    return (
        <div className='header-form'>
            <header>
                <h1 className='title'><img className='flower' src='꽃.png'></img>도담도담<img className='flower' src='꽃.png'></img></h1>
                <nav className='navigation'>
                    <a href="/LoginForm">로그인</a>
                    <a href="/SignupForm">회원가입</a>
                </nav>
            </header>
        </div>
    );
};

export default NonUserHeaderForm;