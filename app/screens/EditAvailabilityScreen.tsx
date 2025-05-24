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
  const [activeTab, setActiveTab] = useState('Oferty');
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [userType, setUserType] = useState('tutor');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [activeInput, setActiveInput] = useState<'start' | 'end'>('end');
  const [tempFilters, setTempFilters] = useState({
    fromDate: '',
    toDate: '',
  });

  const [savedHours, setSavedHours] = useState<{ fromDate: string; toDate: string }[]>([]); // Przechowujemy zapisane godziny

  const navigation = useNavigation();

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSaveFilters = () => {
    console.log('Filters saved');
    // Tutaj możesz dodać logikę do zapisania filtrów
  };

  const handleAddHour = () => {
    // Sprawdzamy, czy obie daty są dostępne przed zapisaniem
    if (tempFilters.fromDate && tempFilters.toDate) {
      // Dodajemy nową godzinę do zapisanych godzin
      setSavedHours((prevHours) => [
        ...prevHours,
        {
          fromDate: tempFilters.fromDate,
          toDate: tempFilters.toDate,
        },
      ]);
      // Resetujemy stan tempFilters po dodaniu godziny
      setTempFilters({ fromDate: '', toDate: '' });
    } else {
      console.log('Wybierz daty przed zapisaniem godziny.');
    }
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

        {/* Wybór godziny */}
        <View className="px-4 mt-6">
          <Text className="font-inter font-regular text-base text-text-light">Wybierz godzinę</Text>
        </View>

        {/* Time Selector */}
        <View className="flex-row items-center justify-between px-4">
          <TimeSelector
            startDate={tempFilters.fromDate ? new Date(tempFilters.fromDate) : undefined}
            endDate={tempFilters.toDate ? new Date(tempFilters.toDate) : undefined}
            onChangeStartDate={(date) =>
              setTempFilters({ ...tempFilters, fromDate: date.toISOString() })
            }
            onChangeEndDate={(date) =>
              setTempFilters({ ...tempFilters, toDate: date.toISOString() })
            }
            showCalendar={calendarVisible}
            setShowCalendar={setCalendarVisible}
            activeInput={activeInput}
            setActiveInput={setActiveInput}
          />

          {/* Zielone kółko z ikoną plusika */}
          <Pressable
            onPress={handleAddHour}
            className="w-8 h-8 bg-primary rounded-full items-center justify-center"
          >
            {savedHours.length === 0 || (savedHours.length > 0 && !tempFilters.fromDate) ? (
              <MaterialIcons name="add" size={20} color="white" />
            ) : (
              <MaterialIcons name="more-vert" size={20} color="white" />
            )}
          </Pressable>
        </View>

        {/* Wyświetlanie zapisanych godzin */}
        {savedHours.length > 0 && (
          <View className="px-4">
            {/* Wyświetlanie zapisanych godzin */}
            {savedHours.map((hour, index) => (
              <View key={index} className="flex-row items-center justify-between mt-2">
                <TimeSelector
                  startDate={new Date(hour.fromDate)}
                  endDate={new Date(hour.toDate)}
                  onChangeStartDate={(date) =>
                    setSavedHours((prevHours) =>
                      prevHours.map((prevHour, i) =>
                        i === index ? { ...prevHour, fromDate: date.toISOString() } : prevHour,
                      ),
                    )
                  }
                  onChangeEndDate={(date) =>
                    setSavedHours((prevHours) =>
                      prevHours.map((prevHour, i) =>
                        i === index ? { ...prevHour, toDate: date.toISOString() } : prevHour,
                      ),
                    )
                  }
                  showCalendar={calendarVisible}
                  setShowCalendar={setCalendarVisible}
                  activeInput={activeInput}
                  setActiveInput={setActiveInput}
                />
                <Pressable
                  onPress={handleAddHour}
                  className="w-8 h-8 bg-primary rounded-full items-center justify-center"
                >
                  <MaterialIcons name="add" size={20} color="white" />
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Dolny panel z przyciskiem Dalej */}
      <View className="bg-white px-[14px] py-3">
        <AppButton label="Dalej" size="full" onPress={handleSaveFilters} />
      </View>
    </View>
  );
};

export default EditAvailabilityScreen;
