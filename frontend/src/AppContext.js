import { createContext, useState, useEffect } from 'react';

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
  const [isEmojiSelected, setIsEmojiSelected] = useState(false);

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
        isEmojiSelected, setIsEmojiSelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };