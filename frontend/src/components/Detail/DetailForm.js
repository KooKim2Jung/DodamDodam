import { Link } from 'react-router-dom';
import FooterForm from '../section/footer/FooterForm';

const DetailForm = ({ title, description, icon, left_link, right_link, hideLeftTriangle, hideRightTriangle }) => {

    return (
        <div>
            <div className='relative top-[70px]'>
                <img className='absolute top-0 left-5 w-[50px] h-[50px]' src="./image/star.png"/>
                <img className='absolute top-[18px] left-[34px] w-[21px] h-[21px]' src={icon}/>
                <div className='relative text-left top-[10px] left-20 text-4xl'>{title}</div>
            </div>
            <div className='relative top-[87px] w-[650px] h-[470px] bg-secondary rounded-[20px]'>
                <div className='relative top-5 left-[20px] w-[610px] h-[380px] rounded-[20px] bg-tertiay'></div>
                <div className='relative top-3 p-[20px] text-small-size'>{description}</div>
            </div>
            <Link to={left_link}>
                <div className={`relative w-0 h-0 border-t-[30px] border-t-transparent 
                    border-b-[30px] border-b-transparent border-r-[40px] border-r-[#FEEBA4] 
                    -top-[175px] -left-[80px] ${hideLeftTriangle ? 'visibility-hidden' : 'visibility-visible'}`}></div>
            </Link>
            <Link to={right_link}>
                <div className={`relative w-0 h-0 border-t-[30px] border-t-transparent 
                    border-b-[30px] border-b-transparent border-l-[40px] border-l-[#FEEBA4] 
                    -top-[240px] left-[690px] ${hideRightTriangle ? 'visibility-hidden' : 'visibility-visible'}`}></div>
            </Link>
            <FooterForm/> 
        </div>
    );
};

export default DetailForm;