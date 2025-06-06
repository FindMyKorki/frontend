import { ScrollView, View, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TopPanel from '../components/TopPanel';
import Calendar from '../components/Calendar';
import TimeSelector from '../components/TimeSelector';
import AppButton from '../components/AppButton';
import React from 'react';
import { Colors } from '../../src/colors';
import { Picker } from '@react-native-picker/picker';
import { FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const AvailabilityRepetitionScreen = () => {
  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([]);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [userType, setUserType] = useState('tutor');

  // State for new fields
  const [repeatCount, setRepeatCount] = useState('1'); // Number input
  const [repeatInterval, setRepeatInterval] = useState<'dzień' | 'tydzień' | 'miesiąc'>('tydzień'); // Dropdown menu
  const [selectedDays, setSelectedDays] = useState<string[]>(['Pn']); // Selected weekdays
  const [endOption, setEndOption] = useState<'nigdy' | 'w-dniu'>('nigdy'); // End options
  const [endDate, setEndDate] = useState<string>(''); // End date if "po-dniu" is selected
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const options = ['dzień', 'tydzień', 'miesiąc'];

  const navigation = useNavigation<NavigationProp<typeof RootStackParamList>>();

  const RootStackParamList = {
    AvailabilityRepetitionScreen: undefined, // Brak parametrów dla tego ekranu
    EditAvailabilityScreen: undefined, // Brak parametrów dla tego ekranu
  };

  const handleOptionSelect = (option: 'dzień' | 'tydzień' | 'miesiąc') => {
    setRepeatInterval(option);
    setIsDropdownVisible(false); // Ukryj listę po wyborze opcji
  };

  const handleSaveFilters = () => {
    navigation.navigate('EditAvailabilityScreen');
  };

  const toggleDaySelection = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((selectedDay) => selectedDay !== day)
        : [...prevSelectedDays, day],
    );
  };

  return (
    <View className="flex-1">
      <TopPanel
        name="Powtarzanie niestandardowe"
        onBackPress={() => navigation.goBack()}
        centerContentClassName="ml-3"
      />
      <ScrollView showsVerticalScrollIndicator={false} className="bg-background pb-10">
        <View className="flex-row justify-between items-center mt-6 mb-5 px-4">
          <Text className="font-inter font-bold text-xl text-primary">DOSTĘPNOŚĆ</Text>
        </View>

        {/* Powtarzanie co */}
        <View className="flex-row items-center space-x-2 ml-4">
          <TextInput
            value="1" // Pozostawiamy wartość statyczną
            onChangeText={() => {}}
            keyboardType="numeric"
            className="border border-gray-300 rounded-md w-10 p-2 text-center h-14"
          />

          {/* Przycisk, po kliknięciu którego rozwija się lista */}
          <TouchableOpacity
            onPress={() => setIsDropdownVisible(!isDropdownVisible)} // Toggle visibility
            className="border border-gray-300 rounded-md w-40 h-14 ml-4 justify-center items-center"
          >
            <Text className="font-inter font-bold text-black">
              {repeatInterval === 'dzień'
                ? 'Dzień'
                : repeatInterval === 'tydzień'
                  ? 'Tydzień'
                  : 'Miesiąc'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista rozwijana */}
        {isDropdownVisible && (
          <View
            style={{
              marginTop: 8,
              width: '100%',
              alignSelf: 'flex-start',
            }}
          >
            <View className="border border-gray-300 rounded-md w-40">
              <FlatList
                data={options}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleOptionSelect(item as 'dzień' | 'tydzień' | 'miesiąc')}
                    className="px-4 py-2 bg-white border-b border-gray-300"
                  >
                    <Text className="font-inter text-black">
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          </View>
        )}

        {/* Powtarza się w */}
        <View className="px-4 mt-6">
          <Text className="font-inter font-regular text-base text-black">Powtarza się w</Text>
          <View className="flex-row justify-between mt-4">
            {['Pn', 'W', 'Ś', 'C', 'Pt', 'S', 'N'].map((day) => (
              <TouchableOpacity
                key={day}
                onPress={() => toggleDaySelection(day)}
                className={`w-12 h-12 rounded-full border-2 border-gray-400 flex justify-center items-center ${
                  selectedDays.includes(day) ? 'bg-[#1A5100]' : 'bg-white'
                }`}
              >
                <Text
                  className={`font-inter font-bold ${selectedDays.includes(day) ? 'text-white' : 'text-black'}`}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Koniec */}
        <View className="px-4 mt-6">
          <Text className="font-inter font-regular text-base text-black">Koniec</Text>
          <View className="flex-col space-y-2">
            {['nigdy', 'w-dniu'].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setEndOption(option as 'nigdy' | 'w-dniu')}
                className={`flex-row items-center space-x-2 mt-4`}
              >
                <View
                  className={`w-6 h-6 border-2 rounded-full flex justify-center items-center ${
                    endOption === option ? 'bg-[#1A5100]' : 'bg-white'
                  }`}
                >
                  <Text
                    className={`text-white ${endOption === option ? 'text-black' : 'text-black'}`}
                  ></Text>
                </View>
                <Text className="font-inter text-sm text-black ml-2">
                  {option === 'nigdy' ? 'Nigdy' : 'W dniu'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {endOption === 'w-dniu' && (
            <View className="mt-6">
              <Text className="font-inter font-regular text-base text-black">Wybierz datę</Text>
              <TextInput
                value={endDate}
                onChangeText={setEndDate}
                placeholder="20 cze 2025"
                className="border border-gray-300 rounded-md p-2 mt-2"
              />
            </View>
          )}
        </View>
      </ScrollView>
      {/* Dolny panel z przyciskiem Dalej */}
      <View className="bg-white px-[14px] py-3">
        <AppButton label="Gotowe" size="full" onPress={handleSaveFilters} />
      </View>
    </View>
  );
};

export default AvailabilityRepetitionScreen;
