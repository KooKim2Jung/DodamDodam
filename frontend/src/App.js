import { createContext, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
  const [isEdit, setIsEdit] = useState(false);
  const [isWardSetting, setIsWardSetting] = useState(false);
  const [isGuardian, setIsGuardian] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [helpStep, setHelpStep] = useState(0);
  // const [isEmojiSelected, setIsEmojiSelected] = useState(false);

  useEffect(() => {
    const storedLoggedInState = sessionStorage.getItem('isLoggedIn');
    if (storedLoggedInState === 'true') {
        setIsLoggedIn(true);
    }

  }, []);

  return (
    <AppContext.Provider 
      value={{
        isLoggedIn, setIsLoggedIn, 
        isEdit, setIsEdit, 
        isWardSetting, setIsWardSetting, 
        isGuardian, setIsGuardian,
        isHelpOpen, setIsHelpOpen,
        isCalendarOpen, setIsCalendarOpen,
        isSummaryOpen, setIsSummaryOpen,
        helpStep, setHelpStep,
        // isEmojiSelected, setIsEmojiSelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function App() {
  const location = useLocation();

  const getPageAddress = () => {
    
    switch(location.pathname) {
      case '/ViewConversationPage':
        return 'ViewConversationPage';
      case '/ViewEmotionAnalysisPage':
        return 'ViewEmotionAnalysisPage';
      case '/SchedulePage':
        return 'SchedulePage';
      case '/HomeInformationSettingsPage':
        return 'HomeInformationSettingsPage';
      case '/DodamSettingsPage':
        return 'DodamSettingsPage';
      case '/WardSettingsPage':
        return 'WardSettingsPage';
      default:
        return null;
    }
  }

  return (
    <AppProvider>
        <Header pageAddress={getPageAddress()}/>
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
    </AppProvider>
  );
}

export default App;
export { AppContext, AppProvider };