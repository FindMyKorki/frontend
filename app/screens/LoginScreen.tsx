import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';

const BACKEND_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;
const REDIRECT_URL = 'https://192.168.1.85:8081/auth/callback';

const LoginScreen = () => {
  const [canOpenDeepLink, setCanOpenDeepLink] = useState<boolean | null>(null);

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    try {
      const REDIRECT_URL = 'findmykorki://auth/callback';

      console.log('!!!!!Sending redirect_to:', REDIRECT_URL);
      console.log('!!!!!Backend URL:', BACKEND_URL);

      const response = await fetch(
        `${BACKEND_URL}/auth/sign-in/${provider}?redirect_to=${encodeURIComponent(REDIRECT_URL)}`,
      );
      const data = await response.json();

      const authUrl = data.oauth_response.url;
      const codeVerifier = data.code_verifier;

      await SecureStore.setItemAsync('code_verifier', codeVerifier);

      const result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URL);
      console.log('Wynik openAuthSessionAsync:', result);
    } catch (error) {
      console.error(error);
      Alert.alert('Błąd logowania', 'Nie udało się otworzyć strony logowania.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 40 }}>FindMyKorki</Text>
      <Pressable onPress={() => handleOAuthLogin('google')} style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Zaloguj się przez Google</Text>
      </Pressable>

      <Pressable onPress={() => handleOAuthLogin('facebook')} style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Zaloguj się przez Facebook</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
