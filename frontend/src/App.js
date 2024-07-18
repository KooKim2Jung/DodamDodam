import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import LoginPage from './pages/user/login/LoginPage';
import SignupPage from './pages/user/signup/SignupPage';
import WardPage from './pages/ward/WardPage';
import HeaderForm from './components/section/header/HeaderForm';
import MainPage from './pages/main/MainPage';
import ViewConversationPage from './pages/guardian/viewConversation/ViewConversationPage';
import ViewEmotionAnalysisPage from './pages/guardian/viewEmotionAnalysis/ViewEmotionAnalysisPage';
import SchedulePage from './pages/guardian/schedule/SchedulePage';
import HomeInformationPage from './pages/guardian/homeInformationSettings/HomeInformationPage';
import DodamSettingsPage from './pages/guardian/dodamSettings/DodamSettingsPage';
import WardSettingsPage from './pages/guardian/wardSettings/WardSettingsPage';

Modal.setAppElement('#root');

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isWardSetting, setIsWardSetting] = useState(false);
  const [isGuardian, setIsGuardian] = useState(false);

  useEffect(() => {
    const storedLoggedInState = localStorage.getItem('isLoggedIn');
    if (storedLoggedInState === 'true') {
        setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <AppContext.Provider 
      value={{
        isLoggedIn, setIsLoggedIn, 
        isEdit, setIsEdit, 
        isWardSetting, setIsWardSetting, 
        isGuardian, setIsGuardian
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <HeaderForm />
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/LoginPage" element={<LoginPage />}/>
          <Route path="/SignupPage" element={<SignupPage/>}/>
          <Route path="/WardPage" element={<WardPage />}/>
          <Route path="/ViewConversationPage" element={<ViewConversationPage />}/>
          <Route path="/ViewEmotionAnalysisPage" element={<ViewEmotionAnalysisPage />}/>
          <Route path='/SchedulePage' element={<SchedulePage />}/>
          <Route path='/HomeInformationPage' element={<HomeInformationPage />}/>
          <Route path='/DodamSettingsPage' element={<DodamSettingsPage />}/>
          <Route path='/WardSettingsPage' element={<WardSettingsPage />}/>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
export { AppContext, AppProvider };