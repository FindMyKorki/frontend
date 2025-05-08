import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as Linking from 'expo-linking';
import { apiCall, loadTokens, setAccessToken, setRefreshToken } from './ApiHandler';
import LoginScreen from '../screens//LoginScreen';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';

interface AuthContextType {
  isAuthenticated: boolean;
}

const BACKEND_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const saveCodeVerifier = async (codeVerifier: string) => {
    await SecureStore.setItemAsync('code_verifier', codeVerifier);
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    try {
      const redirectUrl = `${BACKEND_URL}/auth/callback`;
      const parsedRedirectUrl = `/auth/sign-in/${provider}?redirect_to=${encodeURIComponent(redirectUrl)}`;
      const newResponse = await apiCall({ method: 'GET', url: parsedRedirectUrl });

      await WebBrowser.openBrowserAsync(newResponse?.oauth_response.url);
      saveCodeVerifier(newResponse?.code_verifier);
    } catch (error) {
      setAuthError('Błąd logowania, ' + error);
      console.error(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await loadTokens();
        const res = await apiCall({ method: 'GET', url: '/user/info' });
        if (res?.id) setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleURL = async (url: string) => {
      const parsed = Linking.parse(url);
      const code = parsed.queryParams?.code;

      if (code) {
        const codeVerifier = await SecureStore.getItemAsync('code_verifier');
        const response = await apiCall({
          method: 'GET',
          url: `/auth/exchange-code-for-session/${code}/${codeVerifier}`,
        });

        if (response?.tokens?.access_token) {
          await setAccessToken(response.tokens.access_token);
          await setRefreshToken(response.tokens.refresh_token);
          setIsAuthenticated(true);
        } else {
          setAuthError('Nie udało się pobrać tokenów logowania.');
        }
      }
    };

    const checkInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        await handleURL(initialUrl);
      }
    };

    const handleOpenURL = ({ url }: { url: string }) => handleURL(url);

    checkInitialURL();

    const listener = Linking.addEventListener('url', handleOpenURL);
    return () => listener.remove();
  }, []);

  const contextValue = {
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {isAuthenticated ? children : <LoginScreen login={handleOAuthLogin} authError={authError} />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
