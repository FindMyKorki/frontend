import { ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import TopPanel from '../components/TopPanel';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import AppButton from '../components/AppButton';
import React from 'react';
import TimeRangePicker from '../components/TimeRangePicker';
import { isSameDay } from 'date-fns';

type Availabilities = {
  date: Date;
  availibility: Availability[];
};

type Availability = {
  from: Date;
  to: Date;
  rule: string;
};

const EditAvailabilityScreen = () => {
  const [availabilities, setAvailabilities] = useState<Availabilities[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<number | null>(null);
  const [inUse, setInUse] = useState<Date[]>([]); // Assuming inUse is an array of dates that are already booked
  const [key, setKey] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    setSelectedAvailability(getSelectedAvailabilityIDX());
    setKey((prevKey) => prevKey + 1);
  }, [selectedDate]);

  useEffect(() => {
    const dates = availabilities.map((a) => a.date);
    setInUse(dates);
  }, [availabilities]);

  const handleSaveFilters = () => {
    console.log('Filters saved');
    console.log(availabilities[0].availibility[0].rule);
    // Logic for saving the filters
  };

  function getSelectedAvailabilityIDX() {
    if (!selectedDate) return null;
    if (availabilities.length === 0) return null;
    const idx = availabilities.findIndex((availability) =>
      isSameDay(availability.date, selectedDate),
    );
    return idx > -1 ? idx : null;
  }

  const onTimeSelect = (range: Availability) => {
    setAvailabilities((prev) => {
      const updated = [...prev];

      if (selectedAvailability === null) {
        if (selectedDate === null) return prev;
        updated.push({ date: selectedDate, availibility: [range] });
        setSelectedAvailability(updated.length - 1);
      } else {
        updated[selectedAvailability].availibility.push(range);
      }

      return updated;
    });
    setKey((prevKey) => prevKey + 1);
  };

  const onDelete = (indexToRemove: number) => {
    if (selectedAvailability === null) return;

    setAvailabilities((prev) => {
      let updated = [...prev];

      let ava = updated[selectedAvailability].availibility;

      ava = ava.filter((_, index) => index != indexToRemove);
      updated[selectedAvailability].availibility = ava;
      if (updated[selectedAvailability].availibility.length === 0) {
        updated = updated.filter((_, index) => index !== selectedAvailability);
        setSelectedAvailability(null);
      }
      return updated;
    });
  };

  return (
    <View className="flex-1">
      <TopPanel onBackPress={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} className="bg-background pb-10 px-4 py-3">
        <Text className="font-['Inter'] font-bold text-lg text-primary mb-3.5">DOSTĘPNOŚĆ</Text>

        <AvailabilityCalendar
          className="py-6"
          inUse={inUse}
          onSelect={(date) => setSelectedDate(date)}
        />

        <Text className="font-['Inter'] font-regular text-base text-text-dark mb-3">
          Wybierz godzinę
        </Text>
        {selectedDate && (
          <>
            {selectedAvailability !== null &&
              availabilities[selectedAvailability] &&
              availabilities[selectedAvailability].availibility.map((availability, index) => {
                return (
                  <View className="mb-3" key={`${availability.from.toISOString()}-${index}`}>
                    <TimeRangePicker
                      availabilities={availability}
                      onDelete={() => onDelete(index)}
                      date={selectedDate}
                    />
                  </View>
                );
              })}
            <TimeRangePicker
              key={key}
              onAdd={(range) => onTimeSelect(range)}
              isLast={true}
              date={selectedDate}
            />
          </>
        )}
      </ScrollView>

      {/* Dolny panel z przyciskiem Dalej */}
      <View className="bg-background px-4 py-3 shadow-xl/70" style={{ elevation: 10 }}>
        <AppButton label="Dalej" size="full" onPress={handleSaveFilters} />
      </View>
    </View>
  );
};

export default EditAvailabilityScreen;
