import { Button, ScrollView } from 'react-native';
import ReusableExampleComponent from '../../components/ReusableExampleComponent';
import { useNavigation } from '@react-navigation/native';
import LogoutButton from '../../components/LogoutButton';
import React from 'react';

const ProfileScreen = () => {
  const nav = useNavigation();

  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'Profile screen'} />
      <Button title={'Przejdź do EditProfileScreen'} onPress={() => nav.navigate('EditProfile')} />
      <Button title={'Przejdź do EditOfferScreen'} onPress={() => nav.navigate('EditOffer')} />
      <Button
        title={'Przejdź do ClassAppointmentScreen'}
        onPress={() => nav.navigate('ClassAppointment')}
      />
      <Button title={'Przejdź do ReportScreen'} onPress={() => nav.navigate('Report')} />
      <LogoutButton />
    </ScrollView>
  );
};

export default ProfileScreen;
