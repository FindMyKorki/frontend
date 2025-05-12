import React from 'react';
import { useAuth } from '../utils/AuthProvider';
import { Button } from 'react-native';

const LogoutButton = () => {
  const { signOut } = useAuth();

  return <Button onPress={signOut} title="Wyloguj się" />;
};

export default LogoutButton;
