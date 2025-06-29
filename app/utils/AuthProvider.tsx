import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as Linking from 'expo-linking';
import { apiCall, loadTokens, setAccessToken, setRefreshToken } from './ApiHandler';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import { User } from '../types/User';
import { ActivityIndicator, View } from 'react-native';
import { CompleteProfileScreen, LoginScreen, RoleScreen } from '../index';

interface AuthContextType {
  user: User | null;
  getSession: () => Promise<void>;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}
const BACKEND_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

interface OAuthResponse {
  oauth_response: { url: string };
  code_verifier: string;
}

interface ExchangeCodeResponse {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<false | 'google' | 'facebook'>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    try {
      await loadTokens();
      const res = await apiCall<User>({ method: 'GET', url: '/user' });
      if (res?.id) {
        setUser(res);
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const saveCodeVerifier = async (codeVerifier: string) => {
    await SecureStore.setItemAsync('code_verifier', codeVerifier);
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    try {
      setLoading(provider);
      const redirectUrl = `/auth/callback`;
      const parsedRedirectUrl = `/auth/sign-in/${provider}?redirect_to=${encodeURIComponent(redirectUrl)}`;
      const newResponse = await apiCall<OAuthResponse>({ method: 'GET', url: parsedRedirectUrl });

      await WebBrowser.openBrowserAsync(newResponse?.oauth_response.url);
      await saveCodeVerifier(newResponse?.code_verifier);
    } catch (error) {
      setLoading(false);
      setAuthError('Błąd logowania, ' + error);
      console.error(error);
    }
  };

  useEffect(() => {
    const handleURL = async (url: string) => {
      const parsed = Linking.parse(url);
      const code = parsed.queryParams?.code;

      if (code) {
        const codeVerifier = await SecureStore.getItemAsync('code_verifier');
        const response = await apiCall<ExchangeCodeResponse>({
          method: 'GET',
          url: `/auth/exchange-code-for-session/${code}/${codeVerifier}`,
        });

        if (response?.tokens?.access_token) {
          await setAccessToken(response.tokens.access_token);
          await setRefreshToken(response.tokens.refresh_token);
          await getSession();
        } else {
          setAuthError('Nie udało się pobrać tokenów logowania.');
        }
      }

      setLoading(false);
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

  const signOut = async () => {
    try {
      await apiCall({ method: 'POST', url: '/auth/sign-out' });
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      setAccessToken('');
      setRefreshToken('');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    }
  };

  const contextValue = {
    user,
    getSession,
    isAuthenticated,
    signOut,
  };

  if (isAuthenticated == null) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {!user ? (
        <LoginScreen login={handleOAuthLogin} loading={loading} authError={authError} />
      ) : user.profile?.is_tutor == undefined ? (
        <RoleScreen getSession={getSession} />
      ) : !user.profile?.full_name || (user.profile?.is_tutor && !user.tutor_profile?.bio) ? (
        <CompleteProfileScreen />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
