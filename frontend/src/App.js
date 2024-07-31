import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import MainPage from './pages/Main/MainPage';
import LogInPage from './pages/user/LogIn/LogInPage';
import SignUpPage from './pages/user/SignUp/SignUpPage';
import Header from './components/section/Header/Header';
import WardPage from './pages/Ward/WardPage';
import ViewConversationPage from './pages/guardian/ViewConversation/ViewConversationPage';
import ViewEmotionAnalysisPage from './pages/guardian/ViewEmotionAnalysis/ViewEmotionAnalysisPage';
import SchedulePage from './pages/guardian/Schedule/SchedulePage';
import HomeInformationSettingsPage from './pages/guardian/HomeInformationSettings/HomeInformationSettingsPage';
import DodamSettingsPage from './pages/guardian/DodamSettings/DodamSettingsPage';
import WardSettingsPage from './pages/guardian/WardSettings/WardSettingsPage';

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