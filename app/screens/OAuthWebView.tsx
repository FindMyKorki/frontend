import React, { useEffect, useState, useContext } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../utils/AuthProvider';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from './LoginScreen'; // Zmień ścieżkę jeśli trzeba

const BACKEND_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

const OAuthWebView = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'OAuthWebView'>>();

  const loginUrl = route.params.authUrl;

  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('AuthContext is null – make sure you are inside AuthProvider');

  const { setIsAuthenticated } = authContext;

  const onMessage = (event: any) => {
    const text = event.nativeEvent.data;
    const match = text.match(/Session ID: (\S+)/);
    if (match) {
      const id = match[1];
      setSessionId(id);
    }
  };

  useEffect(() => {
    if (!sessionId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/poll/${sessionId}`);
        if (!res.ok) return;

        const data = await res.json();
        const code = data.code;

        const verifier = await SecureStore.getItemAsync('code_verifier');
        if (!verifier) throw new Error('Brak code_verifier');

        const tokenRes = await fetch(
          `${BACKEND_URL}/auth/exchange-code-for-session/${code}/${verifier}`,
        );
        if (!tokenRes.ok) {
          console.error('Błąd wymiany kodu na tokeny');
          return;
        }

        const tokenData = await tokenRes.json();

        await SecureStore.setItemAsync('access_token', tokenData.tokens.access_token);
        await SecureStore.setItemAsync('refresh_token', tokenData.tokens.refresh_token);

        setIsAuthenticated(true);
        clearInterval(interval);
        clearTimeout(timeout);
        navigation.goBack();
      } catch (err) {
        console.error('Błąd podczas uzyskiwania sesji:', err);
      }
    }, 2000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      Alert.alert('Błąd', 'Logowanie trwało zbyt długo.');
      navigation.goBack();
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [sessionId]);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: loginUrl }}
        onMessage={onMessage}
        javaScriptEnabled
        injectedJavaScript={`window.ReactNativeWebView.postMessage(document.body.innerText); true;`}
      />
      {!sessionId && (
        <ActivityIndicator
          size="large"
          style={{ position: 'absolute', top: '50%', alignSelf: 'center' }}
        />
      )}
    </View>
  );
};

export default OAuthWebView;
