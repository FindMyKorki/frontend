import { FlatList, View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import dayjs from 'dayjs'; // Zaimportuj dayjs

type Props = {
  startDate?: Date;
  endDate?: Date;
  onChangeStartDate: (date: Date) => void;
  onChangeEndDate: (date: Date) => void;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  activeInput: 'start' | 'end';
  setActiveInput: (input: 'start' | 'end') => void;
};

const TimeSelector = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  setShowCalendar,
  setActiveInput,
  activeInput,
}: Props) => {
  const [timeListVisible, setTimeListVisible] = useState<'start' | 'end' | null>(null); // Ustaw stan jako 'start' | 'end' | null
  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<string | null>(null);

  // Generowanie dostępnych godzin co 15 minut
  const generateAvailableTimes = () => {
    const times: string[] = [];
    for (let hour = 7; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = dayjs().hour(hour).minute(minute).format('HH:mm');
        times.push(time);
      }
    }
    return times;
  };

  const availableTimes = generateAvailableTimes(); // Przypisanie dostępnych godzin

  const handleTimeSelect = (time: string) => {
    if (activeInput === 'start') {
      setSelectedStartTime(time);
      onChangeStartDate(new Date(`${dayjs().format('YYYY-MM-DD')} ${time}:00`));
    } else {
      setSelectedEndTime(time);
      onChangeEndDate(new Date(`${dayjs().format('YYYY-MM-DD')} ${time}:00`));
    }
    setTimeListVisible(null); // Po wyborze godziny ukrywamy listę
  };

  const renderItem = (item: string) => (
    <Pressable onPress={() => handleTimeSelect(item)} className="py-2 px-4">
      <Text className="text-lg">{item}</Text>
    </Pressable>
  );

  return (
    <View className="mt-4 px-4">
      <View className="flex-row gap-2 mb-4">
        <Pressable
          onPress={() => {
            setActiveInput('start');
            setTimeListVisible(timeListVisible === 'start' ? null : 'start');
          }}
          className="items-center justify-center border-2 bg-white border-background-alt px-2 py-[5px] rounded"
          style={{ width: 150, height: 40 }}
        >
          <Text className={`${selectedStartTime ? 'text-black' : 'text-gray-400'}`}>
            {selectedStartTime ? `Od ${selectedStartTime}` : 'Od'}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setActiveInput('end');
            setTimeListVisible(timeListVisible === 'end' ? null : 'end');
          }}
          className="items-center justify-center border-2 bg-white border-background-alt px-2 py-[5px] rounded"
          style={{ width: 150, height: 40 }}
        >
          <Text className={`${selectedEndTime ? 'text-black' : 'text-gray-400'}`}>
            {selectedEndTime ? `Do ${selectedEndTime}` : 'Do'}
          </Text>
        </Pressable>
      </View>

      {timeListVisible && (
        <FlatList
          data={availableTimes}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item}
          className="absolute top-full left-0 mt-2 bg-white shadow-md rounded w-full max-h-48 overflow-y-auto"
          style={{ width: 120 }}
        />
      )}
    </View>
  );
};

export default TimeSelector;
