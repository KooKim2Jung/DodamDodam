import { useNavigate  } from 'react-router-dom';

const LoginPage = ({setIsLoggedIn}) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsLoggedIn(true);
        navigate('/ProtectorPage')
    }

    return (
        <div className='flex justify-center items-center bg-primary mt-[120px] 
        mb-[25px] w-[500px] h-[550px] rounded-[20px] shadow-[6px_4px_10px_#a5996e]'>
            <form onSubmit={handleLogin}>
                <div className='w-[202px] h-[228px] ml-5 bg-basic-image bg-center bg-no-repeat bg-[length:98%_97%]'></div>
                <h1 className='text-basic-size'>로그인</h1>
                <div>
                    <input className='input-box'
                        type="email"
                        placeholder='이메일 입력'
                    />
                </div>
                <div>
                    <input className='input-box'
                        type="password"
                        placeholder='비밀번호 입력'
                    />
                </div>
                <button className='btn'>로그인</button>
                 <div>
                    <label for="check-box"><input type="checkbox" id="check-box" className='mb-[15px]'/>이메일 기억하기</label>
                    <p><a href="#">비밀번호를 잊어버리셨나요?</a></p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;