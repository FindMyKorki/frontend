import { ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import TopPanel from '../components/TopPanel';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import AppButton from '../components/AppButton';
import React from 'react';
import TimeRangePicker from '../components/TimeRangePicker';
import { isSameDay } from 'date-fns';
import { apiCall } from '../utils/ApiHandler';
import BottomPanelButtons from '../components/BottomPanelButtons';

type Availabilities = {
  date: Date;
  availibility: Availability[];
};

type Availability = {
  id: Number;
  start_time: Date;
  end_time: Date;
  recurrence_rule: string;
};

type AvailabilityHours = {
  start_time: Date;
  end_time: Date;
  recurrence_rule: string;
};

const EditAvailabilityScreen = () => {
  const [availabilities, setAvailabilities] = useState<Availabilities[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<number | null>(null);
  const [inUse, setInUse] = useState<Date[]>([]);
  const [key, setKey] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  useEffect(() => {
    setSelectedAvailability(getSelectedAvailabilityIDX());
    setKey((prevKey) => prevKey + 1);
  }, [selectedDate, availabilities]);

  useEffect(() => {
    const dates = availabilities.map((a) => a.date);
    setInUse(dates);
  }, [availabilities]);

  const fetchAvailabilities = async () => {
    try {
      const data = (await apiCall({
        method: 'GET',
        url: '/availabilities',
      })) as [{ start_time: string; end_time: string; recurrence_rule: string; id: Number }];

      const groupedByDay = data.reduce((groups, availableTime) => {
        let isFound = false;
        const tutorAvailability: Availability = {
          start_time: new Date(availableTime.start_time),
          end_time: new Date(availableTime.end_time),
          recurrence_rule: availableTime.recurrence_rule,
          id: availableTime.id,
        };

        for (let i = 0; i < groups.length; i++) {
          if (isSameDay(groups[i].date, availableTime.start_time)) {
            groups[i].availibility.push(tutorAvailability);
            isFound = true;
            break;
          }
        }

        if (!isFound) {
          groups.push({
            date: tutorAvailability.start_time,
            availibility: [tutorAvailability],
          });
        }

        return groups;
      }, [] as Availabilities[]);
      if (groupedByDay) setAvailabilities(groupedByDay);
    } catch (e) {
      console.error('GET /availabilities ', e);
    }
  };

  function getSelectedAvailabilityIDX() {
    if (!selectedDate) return null;
    if (availabilities.length === 0) return null;
    const idx = availabilities.findIndex((availability) =>
      isSameDay(availability.date, selectedDate),
    );
    return idx > -1 ? idx : null;
  }

  const onTimeSelect = async (range: AvailabilityHours) => {
    try {
      const response = await apiCall({
        method: 'POST',
        url: '/availabilities',
        data: range,
      });
      console.log(response);
      fetchAvailabilities();
      setKey((prevKey) => prevKey + 1);
    } catch (e) {
      console.error('');
    }
  };

  const onDelete = async (availability_id: number) => {
    if (selectedAvailability === null) return;
    const id = availabilities[selectedAvailability].availibility[availability_id].id;
    try {
      const response = await apiCall({
        method: 'DELETE',
        url: `/availabilities/${id}`,
      });
      console.log(response);
      fetchAvailabilities();
      if (availabilities[selectedAvailability].availibility.length === 1)
        setSelectedAvailability(null);
    } catch (e) {
      console.error(`DELETE /availabilities/${id} `, e);
    }
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
                  <View className="mb-3" key={`${availability.start_time.toISOString()}-${index}`}>
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
              isEditable={true}
              date={selectedDate}
            />
          </>
        )}
      </ScrollView>

      {/* Dolny panel z przyciskiem Dalej */}
      <BottomPanelButtons
        leftButtonProps={{
          label: 'Dalej',
          size: 'full',
          onPress: () => navigation.goBack(),
        }}
      />
    </View>
  );
};

export default EditAvailabilityScreen;
