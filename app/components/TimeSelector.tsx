import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BottomModal from './BottomModal';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  onTimeChange: (times: { start: string; end: string }[]) => void;
};

const TimeSelector = ({ onTimeChange }: Props) => {
  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([]);
  const [activeStart, setActiveStart] = useState<string | null>(null);
  const [activeEnd, setActiveEnd] = useState<string | null>(null);
  const [showTimeList, setShowTimeList] = useState<'start' | 'end' | null>(null);
  const [bottomModalVisible, setBottomModalVisible] = useState(false); // Stan do BottomModal
  const [repeatOption, setRepeatOption] = useState<string>('nie powtarza się'); // Stan opcji powtarzania
  const [editSlotIndex, setEditSlotIndex] = useState<number | null>(null); // Index dla edytowanego slotu
  const navigation = useNavigation<NavigationProp<typeof RootStackParamList>>();

  // Definicja RootStackParamList, aby typy były poprawnie zdefiniowane
  const RootStackParamList = {
    EditAvailabilityScreen: undefined, // Brak parametrów dla tego ekranu
    AvailabilityRepetitionScreen: undefined, // Brak parametrów dla tego ekranu
  };

  // Generowanie dostępnych godzin co 15 minut
  const generateAvailableTimes = () => {
    const times: string[] = [];
    for (let hour = 7; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        times.push(time);
      }
    }
    return times;
  };

  const availableTimes = generateAvailableTimes(); // Generowanie dostępnych godzin

  const handleAddTimeSlot = () => {
    if (activeStart && activeEnd) {
      if (editSlotIndex !== null) {
        // Edytowanie istniejącego slotu
        const updatedSlots = [...timeSlots];
        updatedSlots[editSlotIndex] = { start: activeStart, end: activeEnd };
        setTimeSlots(updatedSlots);
        onTimeChange(updatedSlots);
        setEditSlotIndex(null); // Resetowanie indeksu po edytowaniu
      } else {
        // Dodawanie nowego slotu
        setTimeSlots((prev) => [...prev, { start: activeStart, end: activeEnd }]);
        onTimeChange([...timeSlots, { start: activeStart, end: activeEnd }]);
      }
      setActiveStart(null);
      setActiveEnd(null);
    }
  };

  const handleRemoveTimeSlot = (index: number) => {
    const updatedSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedSlots);
    onTimeChange(updatedSlots);
  };

  const handleTimeSelect = (time: string) => {
    if (showTimeList === 'start') {
      setActiveStart(time);
      setShowTimeList(null);
    } else if (showTimeList === 'end') {
      setActiveEnd(time);
      setShowTimeList(null);
    }
  };

  const handleReset = () => {
    setActiveStart(null);
    setActiveEnd(null);
    setBottomModalVisible(true);
  };

  const handleRepeatOptionChange = (option: string) => {
    setRepeatOption(option);

    if (option === 'niestandardowe') {
      navigation.navigate('AvailabilityRepetitionScreen');
    } else {
      setBottomModalVisible(false); // Zamknięcie modala po wybraniu opcji
    }
  };

  const handleEditSlot = (index: number) => {
    // Ustawienie aktywnego slotu do edycji
    setActiveStart(timeSlots[index].start);
    setActiveEnd(timeSlots[index].end);
    setEditSlotIndex(index); // Zapamiętanie indeksu edytowanego slotu
  };

  return (
    <View className="px-4 mt-4">
      {/* Wyświetlanie wybranych przedziałów */}
      {timeSlots.length > 0 && (
        <View className="mb-4">
          {timeSlots.map((slot, index) => (
            <View key={index} className="flex-row justify-between items-center mb-2">
              <Text className="text-lg">
                {slot.start} - {slot.end}
              </Text>
              <View className="flex-row gap-2">
                {/* Ikona X - Usuwanie slotu */}
                <Pressable onPress={() => handleRemoveTimeSlot(index)}>
                  <MaterialIcons name="close" size={24} color="black" />
                </Pressable>
                {/* Ikona Reset - Resetowanie godzin */}
                <Pressable onPress={handleReset}>
                  <MaterialIcons name="refresh" size={24} color="black" />
                </Pressable>
                {/* Ikona More-Vertical - Edytowanie slotu */}
                <Pressable onPress={() => handleEditSlot(index)}>
                  <MaterialIcons name="more-vert" size={24} color="black" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Pola Od i Do */}
      <View className="flex-row gap-2 mb-4">
        <Pressable
          onPress={() => setShowTimeList(showTimeList === 'start' ? null : 'start')}
          className="items-center justify-center border-2 bg-white border-background-alt px-2 py-[5px] rounded"
          style={{ width: 150, height: 40 }}
        >
          <Text className={`${activeStart ? 'text-black' : 'text-gray-400'}`}>
            {activeStart || 'Od'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setShowTimeList(showTimeList === 'end' ? null : 'end')}
          className="items-center justify-center border-2 bg-white border-background-alt px-2 py-[5px] rounded"
          style={{ width: 150, height: 40 }}
        >
          <Text className={`${activeEnd ? 'text-black' : 'text-gray-400'}`}>
            {activeEnd || 'Do'}
          </Text>
        </Pressable>

        {/* Przycisk dodawania godzin */}
        <Pressable
          onPress={handleAddTimeSlot}
          className="items-center justify-center border-2 bg-[#1A5100] border-background-alt px-2 py-[5px] rounded-full"
        >
          <MaterialIcons
            name={editSlotIndex !== null ? 'done' : 'add'} // Zmieniamy ikonę w zależności od stanu edycji
            size={24}
            color="white"
          />
        </Pressable>
      </View>

      {/* Lista godzin dla "Od" i "Do" */}
      {(showTimeList === 'start' || showTimeList === 'end') && (
        <View className="bg-white shadow-md rounded w-full mt-2">
          {availableTimes.map((time) => (
            <Pressable key={time} onPress={() => handleTimeSelect(time)} className="py-2 px-4">
              <Text className="text-lg">{time}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Bottom Modal z opcjami powtarzania */}
      <BottomModal visible={bottomModalVisible} setVisible={setBottomModalVisible}>
        <View className="w-full items-center justify-center">
          <View className="flex flex-col items-center gap-y-2">
            <Pressable onPress={() => handleRepeatOptionChange('nie powtarza się')}>
              <Text className={repeatOption === 'nie powtarza się' ? 'font-bold' : ''}>
                Nie powtarza się
              </Text>
            </Pressable>
            <Pressable onPress={() => handleRepeatOptionChange('codziennie')}>
              <Text className={repeatOption === 'codziennie' ? 'font-bold' : ''}>Codziennie</Text>
            </Pressable>
            <Pressable onPress={() => handleRepeatOptionChange('co tydzień')}>
              <Text className={repeatOption === 'co tydzień' ? 'font-bold' : ''}>Co tydzień</Text>
            </Pressable>
            <Pressable onPress={() => handleRepeatOptionChange('co miesiąc')}>
              <Text className={repeatOption === 'co miesiąc' ? 'font-bold' : ''}>Co miesiąc</Text>
            </Pressable>
            <Pressable onPress={() => handleRepeatOptionChange('niestandardowe')}>
              <Text className={repeatOption === 'niestandardowe' ? 'font-bold' : ''}>
                Niestandardowe
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomModal>
    </View>
  );
};

export default TimeSelector;
