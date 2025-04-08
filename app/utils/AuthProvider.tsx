import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as Linking from 'expo-linking';
import ApiHandler from './ApiHandler';
import LoginScreen from '../screens//LoginScreen';

const api = new ApiHandler();
const BACKEND_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  //setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  //const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleDeepLink = async (event: Linking.EventType) => {
      const url = event.url;
      const parsed = Linking.parse(url);
      const code = parsed.queryParams?.code;

      if (code) {
        console.log('Odebrany code:', code);
      }
    };

    const listener = Linking.addEventListener('url', handleDeepLink);

    return () => {
      listener.remove();
    };
    // const checkAuth = async () => {
    //   try {
    //     await api.apiCall({ method: 'GET', url: '/user/info' });
    //     setIsAuthenticated(true);
    //   } catch {
    //     setIsAuthenticated(false);
    //   }
    // };

    // checkAuth();
  }, []);

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {isAuthenticated ? children : <LoginScreen />}
    </AuthContext.Provider>
  );

  // const setToken = (token: string) => {
  //   api.setToken(token);
  //   setIsAuthenticated(true);
  // };

  // if (isAuthenticated === null) return <div>Ładowanie...</div>;

  // return (
  //   <AuthContext.Provider value={{ isAuthenticated, setToken }}>
  //     {isAuthenticated ? children : <LoginScreen />}
  //   </AuthContext.Provider>
  // );
};

export default AuthProvider;
