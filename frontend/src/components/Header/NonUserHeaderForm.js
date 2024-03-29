import React from 'react';
import './HeaderForm.css';

const NonUserHeaderForm = () => {
    return (
        <div className='header-form'>
            <header>
                <h1 className='title'><img className='flower' src='./image/title_flower.png'>
                    </img><a href="/">도담도담</a><img className='flower' src='./image/title_flower.png'></img></h1>
                <nav className='navigation'>
                    <a href="/LoginPage">로그인</a>
                    <a href="/SignupPage">회원가입</a>
                </nav>
            </header>
        </div>
    );
};

export default NonUserHeaderForm;