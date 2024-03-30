import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import UnprotectorPage from './pages/Unprotector/UnprotectorPage';
import ProtectorPage from './pages/Protector/ProtectorPage';
import UserHeaderForm from './components/Header/UserHeaderForm';
import NonUserHeaderForm from './components/Header/NonUserHeaderForm';
import MainPage from './pages/Main/MainPage';
import AboutPage from './pages/Main/AboutPage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? <UserHeaderForm/> : <NonUserHeaderForm/>}
      <BrowserRouter>
        <Routes>
          <Route path="/AboutPage" element={<AboutPage/>}/>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/LoginPage" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/SignupPage" element={<SignupPage/>}/>
          <Route path="/UnprotectorPage" element={<UnprotectorPage/>}/>
          <Route path="/protectorPage" element={<ProtectorPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;