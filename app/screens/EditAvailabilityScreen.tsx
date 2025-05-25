import { ScrollView, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TopPanel from '../components/TopPanel';
import Calendar from '../components/Calendar';
import TimeSelector from '../components/TimeSelector';
import AppButton from '../components/AppButton';
import React from 'react';
import { Colors } from '../../src/colors';

const EditAvailabilityScreen = () => {
  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([]);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [userType, setUserType] = useState('tutor');

  const navigation = useNavigation();

  const handleSaveFilters = () => {
    console.log('Filters saved');
    // Logic for saving the filters
  };

  return (
    <View className="flex-1">
      <TopPanel onBackPress={() => navigation.goBack()} centerContentClassName="ml-3" />
      <ScrollView showsVerticalScrollIndicator={false} className="bg-background pb-10">
        <View className="flex-row justify-between items-center mt-6 mb-5 px-4">
          <Text className="font-inter font-bold text-xl text-primary">DOSTĘPNOŚĆ</Text>
        </View>
        <View className="px-4">
          {/* Kalendarz */}
          <Calendar className="mt-2" tutor_id="1" />
        </View>

        {/* Wybór godzin */}
        <View className="px-4 mt-6">
          <Text className="font-inter font-regular text-base text-text-light">Wybierz godzinę</Text>
          <TimeSelector onTimeChange={setTimeSlots} />
        </View>
      </ScrollView>

      {/* Dolny panel z przyciskiem Dalej */}
      <View className="bg-white px-[14px] py-3">
        <AppButton label="Dalej" size="full" onPress={handleSaveFilters} />
      </View>
    </View>
  );
};

export default EditAvailabilityScreen;
