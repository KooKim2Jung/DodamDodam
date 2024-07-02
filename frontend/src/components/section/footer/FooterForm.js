import React from 'react';
import { useLocation } from 'react-router-dom';

const FooterForm = () => {
    const location = useLocation();

    const imageLocation = () => {
        return {
            left: location.pathname === "/" ? '23px' :
            location.pathname === "/AboutPage" ? '55px' :
            '87px'
        }
    };

    return (
        <footer className='fixed left-0 bottom-0 w-full h-[75px] text-center p-[20px]'>
            <div className="inline-flex items-center">
                <img className='relative size-8' style={imageLocation()} src="./image/flower.png"/>
                <a href="/"><div className='bg-secondary border-black border-[1.5px] h-4 w-4 mr-4 rounded-full'></div></a>
                <a href="/AboutPage"><div className='bg-secondary border-black border-[1.5px] h-4 w-4 mr-4 rounded-full'></div></a>
                <a href="/DetailPage"><div className='bg-secondary border-black border-[1.5px] h-4 w-4 mr-4 rounded-full'></div></a>
            </div>
        </footer>
    );
};

export default FooterForm;