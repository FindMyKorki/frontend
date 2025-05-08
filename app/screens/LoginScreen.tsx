import React, { FC } from 'react';
import { View, Text, Pressable } from 'react-native';

type LoginProps = {
  login: (provider: 'google' | 'facebook') => Promise<void>;
  authError: string | null;
};

const LoginScreen: FC<LoginProps> = ({ login, authError }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 40 }}>FindMyKorki</Text>
      <Pressable onPress={() => login('google')} style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Zaloguj się przez Google</Text>
      </Pressable>

      <Pressable onPress={() => login('facebook')} style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Zaloguj się przez Facebook</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
