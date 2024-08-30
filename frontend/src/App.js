import { useContext, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppContext } from './AppProvider';
import Modal from 'react-modal';
import MainPage from './pages/Main/MainPage';
import LogInPage from './pages/user/LogIn/LogInPage';
import SignUpPage from './pages/user/SignUp/SignUpPage';
import Header from './components/section/Header/Header';
import Aside from './components/section/Aside/Aside';
import WardPage from './pages/Ward/WardPage';
import ViewConversationPage from './pages/guardians/ViewConversation/ViewConversationPage';
import ViewEmotionAnalysisPage from './pages/guardians/ViewEmotionAnalysis/ViewEmotionAnalysisPage';
import SchedulePage from './pages/guardians/Schedule/SchedulePage';
import HomeInformationSettingsPage from './pages/guardians/HomeInformationSettings/HomeInformationSettingsPage';
import DodamSettingsPage from './pages/guardians/DodamSettings/DodamSettingsPage';
import WardSettingsPage from './pages/guardians/WardSettings/WardSettingsPage';

Modal.setAppElement('#root');

function App() {
  const { isGuardian } = useContext(AppContext);
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
    <>
      <Header pageAddress={getPageAddress()}/>
      {isGuardian && <Aside/>}
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
    </>
  );
}

export default App;