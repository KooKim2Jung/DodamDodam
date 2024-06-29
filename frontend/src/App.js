import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import LoginPage from './pages/user/login/LoginPage';
import SignupPage from './pages/user/signup/SignupPage';
import WardPage from './pages/ward/WardPage';
import UserHeaderForm from './components/section/header/UserHeaderForm';
import NonUserHeaderForm from './components/section/header/NonUserHeaderForm';
import MainPage from './pages/main/MainPage';
import AboutPage from './pages/main/about/AboutPage';
import EmotionalAnalysisPage from './pages/main/detail/EmotionalAnalysisPage';
import ConversationSummaryPage from './pages/main/detail/ConversationSummaryPage';
import SchedulingPage from './pages/main/detail/SchedulingPage';
import SettingsPage from './pages/main/detail/SettingsPage';
import ViewConversationPage from './pages/guardian/viewConversation/ViewConversationPage';
import ViewEmotionAnalysisPage from './pages/guardian/viewEmotionAnalysis/ViewEmotionAnalysisPage';
import SchedulePage from './pages/guardian/schedule/SchedulePage';
import DodamSettingsPage from './pages/guardian/dodamSettings/DodamSettingsPage';
import WardSettingsPage from './pages/guardian/wardSettings/WardSettingsPage';

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
          <Route path="/ViewConversationPage" element={<ViewConversationPage isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>}/>
          <Route path="/ViewEmotionAnalysisPage" element={<ViewEmotionAnalysisPage isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>}/>
          <Route path='/SchedulePage' element={<SchedulePage isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>}/>
          <Route path='/DodamSettingsPage' element={<DodamSettingsPage isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting}/>}/>
          <Route path='/WardSettingsPage' element={<WardSettingsPage isEdit={isEdit} setIsEdit={setIsEdit} isGuardian={isGuardian} setIsGuardian={setIsGuardian} isWardSetting={isWardSetting} setIsWardSetting={setIsWardSetting}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;