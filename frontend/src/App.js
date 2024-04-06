import { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import UnprotectorPage from './pages/Unprotector/UnprotectorPage';
import ProtectorPage from './pages/Protector/ProtectorPage';
import UserHeaderForm from './components/Header/UserHeaderForm';
import NonUserHeaderForm from './components/Header/NonUserHeaderForm';
import MainPage from './pages/Main/MainPage';
import AboutPage from './pages/Main/About/AboutPage';
import EmotionalAnalysisPage from './pages/Main/Detail/EmotionalAnalysisPage';
import ConversationSummaryPage from './pages/Main/Detail/ConversationSummaryPage';
import SchedulingPage from './pages/Main/Detail/SchedulingPage';
import SettingsPage from './pages/Main/Detail/SettingsPage';

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
          <Route path="/ConversationSummaryPage" element={<ConversationSummaryPage/>}/>
          <Route path="/EmotionalAnalysisPage" element={<EmotionalAnalysisPage/>}/>
          <Route path="/SchedulingPage" element={<SchedulingPage/>}/>
          <Route path="/SettingsPage" element={<SettingsPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;