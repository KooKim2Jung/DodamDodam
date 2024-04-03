import { useNavigate  } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({setIsLoggedIn}) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsLoggedIn(true);
        navigate('/ProtectorPage')
    }

    return (
        <div className="login-box">
            <form onSubmit={handleLogin}>
                <div className="dodam-crop">
                    <img className='dodam' src='./image/dodam_basic.png' ></img>
                </div>
                <h1>로그인</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder='이메일 입력'
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder='비밀번호 입력'
                    />
                </div>
                <button className='btn'>로그인</button>
                 <div className="remember-forgot">
                    <label for="check-box"><input type="checkbox" id="check-box"/>이메일 기억하기</label>
                    <a href="#">비밀번호를 잊어버리셨나요?</a>
                </div>
                
            </form>
        </div>
    );
};

export default LoginPage;