import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';

const BACKEND_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;
const FRONTEND_URL = process.env.FRONTEND_URL;

const LoginScreen = () => {
  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    try {
      const REDIRECT_URL = `${BACKEND_URL}/auth/callback`;

      console.log('!!!!!Sending redirect_to:', REDIRECT_URL);
      console.log('!!!!!Backend URL:', BACKEND_URL);

      const response = await fetch(
        `${BACKEND_URL}/auth/sign-in/${provider}?redirect_to=${encodeURIComponent(REDIRECT_URL)}`,
      );
      const data = await response.json();
      console.log('json data:', data);
      const authUrl = data.oauth_response.url;
      const codeVerifier = data.code_verifier;

      await SecureStore.setItemAsync('code_verifier', codeVerifier);
      console.log('✅ Zapisany code_verifier:', codeVerifier);

      const result = await WebBrowser.openBrowserAsync(authUrl);
      //console.log('CODE HELLLEEEEAAAAA:', result.url);
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
