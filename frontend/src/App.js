import './App.css';
import LoginForm from './component/LoginForm';
import UserHeaderForm from './component/UserHeaderForm';
import SignupForm from './component/SignupForm';
import Unprotector from './pages/Unprotector';
import Protector from './pages/Protector';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NonUserHeaderForm from './component/NonUserHeaderForm';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? <UserHeaderForm/> : <NonUserHeaderForm/>}
      <BrowserRouter>
        <Routes>
          <Route path="/LoginForm" element={<LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/SignupForm" element={<SignupForm/>}/>
          <Route path="/Unprotector" element={<Unprotector/>}/>
          <Route path="/protector" element={<Protector/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;