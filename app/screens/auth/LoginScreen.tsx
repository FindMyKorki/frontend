import { Text, View } from 'react-native';
import Auth from '../../../assets/auth.svg';
import AppButton from '../../components/AppButton';

const LoginScreen = () => {
  return (
    <View className={'flex-1'}>
      <View className="flex-1 items-center justify-center p-def-x">
        <Auth height={'90%'} />
      </View>
      <View className={'flex-1 items-center justify-center p-def-x'}>
        <Text>Hej!</Text>
        <AppButton
          label={'Zaloguj się z Google'}
          className={'w-full'}
          icon={'google'}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
