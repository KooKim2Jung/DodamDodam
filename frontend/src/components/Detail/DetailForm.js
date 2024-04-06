import { Link } from 'react-router-dom';
import DetailFooterForm from '../Footer/DetailFooterForm';
import './DetailForm.css';

const DetailForm = ({ function_title, function_explanation, function_icon, left_link, right_link, hideLeftTriangle, hideRightTriangle }) => {

    return (
        <div className='detail-box'>
            <div className="detail-bar">
                <img className="star" src="./image/star.png"/>
                <img className="front-image2" src={function_icon}/>
                <h2>{function_title}</h2>
            </div>
            <div className="detail-container">
                <div className="detail-display"></div>
                <div className="detail-text">{function_explanation}</div>
            </div>
            {hideLeftTriangle ? null : <Link to={left_link}><div className="triangle-btn" id="triangle-left"></div></Link>}
            {hideRightTriangle ? null : <Link to={right_link}><div className="triangle-btn" id="triangle-right"></div></Link>}
            <DetailFooterForm/> 
        </div>
    );
};

export default DetailForm;