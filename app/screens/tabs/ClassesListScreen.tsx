import React from 'react';
import { View } from 'react-native';
import BookingScreen from '../BookingScreen'; // Import BookingScreen

const ClassesListScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <BookingScreen /> {/* Wywołanie komponentu BookingScreen */}
    </View>
  );
};

export default ClassesListScreen;
