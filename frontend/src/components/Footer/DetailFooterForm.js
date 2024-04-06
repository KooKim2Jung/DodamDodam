import React from 'react';

const DetailFooterForm = () => {
    return (
        <div className='detail-footer-form'>
            <footer>
                <img className='icon-flower' src="./image/flower.png"/>
                <div className="icon-container">
                    <a href="/"><div className="icon-circle"></div></a>
                    <a href="/AboutPage"><div className="icon-circle"></div></a>
                    <div className="icon-circle"></div>
                </div>
            </footer>
        </div>
    );
};

export default DetailFooterForm;