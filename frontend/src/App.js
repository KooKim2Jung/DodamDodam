import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import WardPage from './pages/Ward/WardPage';
import UserHeaderForm from './components/Header/UserHeaderForm';
import NonUserHeaderForm from './components/Header/NonUserHeaderForm';
import MainPage from './pages/Main/MainPage';
import AboutPage from './pages/Main/About/AboutPage';
import EmotionalAnalysisPage from './pages/Main/Detail/EmotionalAnalysisPage';
import ConversationSummaryPage from './pages/Main/Detail/ConversationSummaryPage';
import SchedulingPage from './pages/Main/Detail/SchedulingPage';
import SettingsPage from './pages/Main/Detail/SettingsPage';
import ViewConversationPage from './pages/Guardian/ViewConversation/ViewConversationPage';
import ViewEmotionAnalysisPage from './pages/Guardian/ViewEmotionAnalysis/ViewEmotionAnalysisPage';
import SchedulePage from './pages/Guardian/Schedule/SchedulePage';
import DodamSettingsPage from './pages/Guardian/DodamSettings/DodamSettingsPage';
import WardSettingsPage from './pages/Guardian/WardSettings/WardSettingsPage';

Modal.setAppElement('#root');

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isWardSetting, setIsWardSetting] = useState(false);
  const [isGuardian, setIsGuardian] = useState(false);

  useEffect(() => {
    const storedLoggedInState = localStorage.getItem('isLoggedIn');
    if (storedLoggedInState === 'true') {
        setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
      {isLoggedIn ? <UserHeaderForm setIsLoggedIn={setIsLoggedIn} /> : <NonUserHeaderForm/>}
        <Routes>
          <Route path="/AboutPage" element={<AboutPage/>}/>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/LoginPage" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setIsEdit={setIsEdit} setIsWardSetting={setIsWardSetting}/>}/>
          <Route path="/SignupPage" element={<SignupPage/>}/>
          <Route path="/WardPage" element={<WardPage setIsGuardian={setIsGuardian}/>}/>
          <Route path="/ConversationSummaryPage" element={<ConversationSummaryPage/>}/>
          <Route path="/EmotionalAnalysisPage" element={<EmotionalAnalysisPage/>}/>
          <Route path="/SchedulingPage" element={<SchedulingPage/>}/>
          <Route path="/SettingsPage" element={<SettingsPage/>}/>
          <Route path="/ViewConversationPage" element={<ViewConversationPage isGuardian={isGuardian} setIsGuardian={setIsGuardian}/>}/>
          <Route path="/ViewEmotionAnalysisPage" element={<ViewEmotionAnalysisPage/>}/>
          <Route path='/SchedulePage' element={<SchedulePage/>}/>
          <Route path='/DodamSettingsPage' element={<DodamSettingsPage/>}/>
          <Route path='/WardSettingsPage' element={<WardSettingsPage isEdit={isEdit} setIsEdit={setIsEdit} isWardSetting={isWardSetting} setIsWardSetting={setIsWardSetting}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;