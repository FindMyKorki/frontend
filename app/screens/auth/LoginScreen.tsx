import React, { FC } from 'react';
import { Text, View } from 'react-native';
import Auth from '../../../assets/auth.svg';
import AppButton from '../../components/AppButton';

type LoginProps = {
  loading: false | 'google' | 'facebook';
  login: (provider: 'google' | 'facebook') => Promise<void>;
  authError: string | null;
};

const LoginScreen: FC<LoginProps> = ({ login, loading, authError }) => {
  return (
    <View className={'flex-1 bg-white'}>
      <View className="flex-1 items-center justify-center p-def-x">
        <Auth height={'90%'} />
      </View>
      <View className={'flex-1 items-center p-def-x'}>
        <Text className={'text-base mb-[-5] font-bold'}>WITAJ W</Text>
        <Text className={'text-[2.5rem] font-bold'}>FindMyKorki</Text>
        <Text className={'text-base font-medium mt-4 text-center px-8'}>
          aplikacji, która pomoże Ci znaleźć nauczyciela odpowiadającego Twoim potrzebom
        </Text>
        <View className={'flex-1'} />

        <AppButton
          label={'Zaloguj się z Google'}
          className={'w-full mb-2'}
          icon={'google'}
          disabled={!!loading}
          loading={loading === 'google'}
          onPress={() => login('google')}
        />
        <AppButton
          label={'Zaloguj się z Facebook'}
          className={'w-full mb-5'}
          icon={'facebook'}
          disabled={!!loading}
          loading={loading === 'facebook'}
          onPress={() => login('facebook')}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
