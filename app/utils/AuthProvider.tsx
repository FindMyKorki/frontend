import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as Linking from 'expo-linking';
import ApiHandler from './ApiHandler';
import LoginScreen from '../screens//LoginScreen';
import * as SecureStore from 'expo-secure-store';

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
    const checkInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();

      if (initialUrl) {
        const parsed = Linking.parse(initialUrl);
        const code = parsed.queryParams?.code;

        if (code) {
          console.log('Odebrany code:', code);

          const codeVerifier = await SecureStore.getItemAsync('code_verifier');
          console.log('📦 Odczytany code_verifier w AuthProvider:', codeVerifier);

          const response = await fetch(
            `${BACKEND_URL}/auth/exchange-code-for-session/${code}/${codeVerifier}`,
          );
          const data = await response.json();

          if (data.tokens?.access_token) {
            await SecureStore.setItemAsync('access_token', data.tokens.access_token);
            await SecureStore.setItemAsync('refresh_token', data.tokens.refresh_token);
            setIsAuthenticated(true);
          } else {
            console.warn('Nie udało się pobrać tokenów.');
          }
        }
      }
    };

    checkInitialURL();
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
