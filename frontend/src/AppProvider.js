import { createContext, useState, useEffect } from 'react';
import Spinner from './components/Spinner/Spinner';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isWardSet, setIsWardSet] = useState(false);
  const [isGuardian, setIsGuardian] = useState(false);
  const [isGuardianOpen, setIsGuardianOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [helpStep, setHelpStep] = useState(0);
  const [isEmojiSelected, setIsEmojiSelected] = useState(false);
  const [SSEVoiceUrl, setSSEVoiceUrl] = useState('');
  const [eventSource, setEventSource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  useEffect(() => {
    const storedLoggedInState = sessionStorage.getItem('isLoggedIn') === 'true';
    const storedIsWardSetState = sessionStorage.getItem('isWardSet') === 'true';
    const storedIsGuardianState = sessionStorage.getItem('isGuardian') === 'true';

    setIsLoggedIn(storedLoggedInState);
    setIsWardSet(storedIsWardSetState);
    setIsGuardian(storedIsGuardianState);

    if (storedLoggedInState) {
      getSSE();
    }
    setIsLoading(false);
  }, []);

  const getSSE = async () => {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:8080/api/v1/sse', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while(true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('SSE 스트림이 종료되었습니다.');
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        console.log('SSE 메시지 수신:', chunk);

        // JSON 파싱 후 처리
        if (chunk.startsWith("data: ")) {
          const jsonData = chunk.replace("data: ", "").trim();

          if (jsonData.startsWith("{") && jsonData.endsWith("}")) {
            try {
              const parsedData = JSON.parse(jsonData);
              setSSEVoiceUrl(parsedData.mp3_url);
            } catch (error) {
              console.error('JSON 파싱 오류:', error);
            }
          } else {
            console.log('텍스트 메시지 수신:', jsonData);
          }
        }
      }
    } catch (error) {
      console.error('SSE 연결 오류:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close(); // 컴포넌트 언마운트 시 SSE 연결 종료
      }
    };
  }, [eventSource]);

  return (
    <AppContext.Provider 
      value={{
        isLoggedIn, setIsLoggedIn, 
        isEdit, setIsEdit, 
        isWardSet, setIsWardSet, 
        isGuardian, setIsGuardian,
        isGuardianOpen, setIsGuardianOpen,
        isHelpOpen, setIsHelpOpen,
        isCalendarOpen, setIsCalendarOpen,
        isSummaryOpen, setIsSummaryOpen,
        helpStep, setHelpStep,
        isEmojiSelected, setIsEmojiSelected,
        SSEVoiceUrl, setSSEVoiceUrl,
        getSSE,
        isLoading, setIsLoading,
        emailFocus, setEmailFocus,
        passwordFocus, setPasswordFocus,
        phoneNumberFocus, setPhoneNumberFocus,
      }}
    >
      { isLoading ? <Spinner/> : children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };