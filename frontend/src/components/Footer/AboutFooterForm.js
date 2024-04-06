import React from 'react';
import './FooterForm.css';

const AboutFooterForm = () => {
    return (
        <div className='about-footer-form'>
            <footer>
                <img className='icon-flower' src="./image/flower.png"/>
                <div className="icon-container">
                    <a href="/"><div className="icon-circle"></div></a>
                    <div className="icon-circle"></div>
                    <a href="/EmotionalAnalysisPage"><div className="icon-circle"></div></a>
                </div>
            </footer>
        </div>
    );
};

export default AboutFooterForm;