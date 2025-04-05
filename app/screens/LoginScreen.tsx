import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';

const BACKEND_URL = 'http://192.168.1.85:8000';

const LoginScreen = () => {
  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/sign-in/${provider}`);
      const data = await response.json();

      const authUrl = data.oauth_repsponse.url;
      const codeVerifier = data.code_verifier;

      await SecureStore.setItemAsync('code_verifier', codeVerifier);

      await WebBrowser.openAuthSessionAsync(authUrl, 'findmykorki://auth/callback');
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
