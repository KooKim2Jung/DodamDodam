import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import MainPage from './pages/Main/MainPage';
import LogInPage from './pages/user/LogIn/LogInPage';
import SignUpPage from './pages/user/SignUp/SignUpPage';
import Header from './components/section/Header/Header';
import WardPage from './pages/Ward/WardPage';
import ViewConversationPage from './pages/guardians/ViewConversation/ViewConversationPage';
import ViewEmotionAnalysisPage from './pages/guardians/ViewEmotionAnalysis/ViewEmotionAnalysisPage';
import SchedulePage from './pages/guardians/Schedule/SchedulePage';
import HomeInformationSettingsPage from './pages/guardians/HomeInformationSettings/HomeInformationSettingsPage';
import DodamSettingsPage from './pages/guardians/DodamSettings/DodamSettingsPage';
import WardSettingsPage from './pages/guardians/WardSettings/WardSettingsPage';

Modal.setAppElement('#root');

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isWardSetting, setIsWardSetting] = useState(false);
  const [isGuardian, setIsGuardian] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    const storedLoggedInState = sessionStorage.getItem('isLoggedIn');
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
        isGuardian, setIsGuardian,
        isHelpOpen, setIsHelpOpen,
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
        <Header />
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/LogInPage' element={<LogInPage/>}/>
          <Route path='/SignUpPage' element={<SignUpPage/>}/>
          <Route path='/WardPage' element={<WardPage/>}/>
          <Route path='/ViewConversationPage' element={<ViewConversationPage/>}/>
          <Route path='/ViewEmotionAnalysisPage' element={<ViewEmotionAnalysisPage/>}/>
          <Route path='/SchedulePage' element={<SchedulePage/>}/>
          <Route path='/HomeInformationSettingsPage' element={<HomeInformationSettingsPage/>}/>
          <Route path='/DodamSettingsPage' element={<DodamSettingsPage/>}/>
          <Route path='/WardSettingsPage' element={<WardSettingsPage/>}/>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
export { AppContext, AppProvider };