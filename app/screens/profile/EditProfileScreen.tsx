import React from 'react';
import { useNavigation } from '@react-navigation/native';
import EditProfileForm from '../../components/EditProfileForm';

const EditProfileScreen = () => {
  const nav = useNavigation();

  return (
    <EditProfileForm
      navigateTo={() => {
        nav.goBack();
      }}
      buttonLabel="Zapisz zminay"
    />
  );
};

export default EditProfileScreen;
