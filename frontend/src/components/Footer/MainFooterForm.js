import React from 'react';
import './FooterForm.css'

const MainFooterForm = () => {
    return (
        <div className='main-footer-form'>
            <footer>
                <img className='icon-flower' src="./image/flower.png"/>
                <div className="icon-container">
                    <div className="icon-circle"></div>
                    <a href="/AboutPage"><div className="icon-circle"></div></a>
                    <a href="/EmotionalAnalysisPage"><div className="icon-circle"></div></a>
                </div>
            </footer>
        </div>
    );
};

export default MainFooterForm;