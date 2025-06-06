import React from 'react';
import EditProfileForm from '../components/EditProfileForm';
import { useNavigation } from '@react-navigation/native';

const CompleteProfileScreen = () => {
  const nav = useNavigation();

  return (
    <EditProfileForm
      navigateTo={() => {
        // nav.navigate('HomeScreen' as never)
      }}
      buttonLabel="Dalej"
    />
  );
};

export default CompleteProfileScreen;
