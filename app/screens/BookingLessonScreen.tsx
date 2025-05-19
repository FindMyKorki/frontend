import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, TouchableOpacity, FlatList } from 'react-native';
import Calendar from '../components/Calendar';
import LessonDetails from '../components/LessonDetails';
import { apiCall } from '../utils/ApiHandler';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  differenceInMinutes,
  setSeconds,
  setMilliseconds,
  addMinutes,
  format,
  subMinutes,
} from 'date-fns';

const durations = [45, 60, 90, 105, 120];
const timeDIFF = 15;

type TimeBlock = {
  start_date: string;
  end_date: string;
};

type DateBlock = {
  start_date: Date;
  end_date: Date;
  difference: number;
};

type Offer = {
  tutor_id: string;
  price: number;
  subject_name: string;
  description: string;
  level: string;
  tutor_full_name: string;
};

const BookingLessonScreen = () => {
  const nav = useNavigation();
  const route = useRoute();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [dateBlocks, setTimeBlocks] = useState<DateBlock[]>([]);
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);
  const [maxDuration, setMaxDuration] = useState(durations[durations.length - 1]);
  const [lessonStartTimes, setLessonStartTimes] = useState<Date[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const offer_id = (route.params as { offer_id: number }).offer_id;

  useEffect(() => {
    const getOffer = async () => {
      setOffer(
        await apiCall({
          method: 'GET',
          url: `/offers/${offer_id}`,
        }),
      );
    };

    getOffer();
  }, []);

  useEffect(() => {
    let max = 0;
    if (dateBlocks.length == 0) {
      max = durations[durations.length - 1];
    } else {
      max = Math.max(...dateBlocks.map((item) => item.difference));
    }

    if (selectedDuration > max) setSelectedDuration(durations[0]);

    setMaxDuration(max);
    manageLessonsStartTimes();
  }, [dateBlocks]);

  useEffect(() => {
    manageLessonsStartTimes();
    setStartTime(null);
  }, [selectedDuration]);

  function manageLessonsStartTimes() {
    const newStartTimes: Date[] = [];

    for (let i = 0; i < dateBlocks.length; i++) {
      if (dateBlocks[i].difference >= selectedDuration) {
        newStartTimes.push(dateBlocks[i].start_date);
      } else continue;
      let date = roundTime(dateBlocks[i].start_date);
      date = addMinutes(date, timeDIFF);

      while (differenceInMinutes(dateBlocks[i].end_date, date) >= selectedDuration) {
        newStartTimes.push(date);
        date = addMinutes(date, timeDIFF);
      }
    }

    setLessonStartTimes(newStartTimes);
  }

  function roundTime(date: Date) {
    const remainder = date.getMinutes() % 15;
    const rounded = subMinutes(date, remainder);
    return setMilliseconds(setSeconds(rounded, 0), 0);
  }

  const onCalendarSelect = (blocks: TimeBlock[]) => {
    const dates = Array.from({ length: blocks.length }, (_, i) => {
      const start = new Date(blocks[i].start_date);
      const end = new Date(blocks[i].end_date);

      return {
        start_date: start,
        end_date: end,
        difference: differenceInMinutes(end, start),
      };
    });

    setTimeBlocks(dates);
    setStartTime(null);
  };

  const handleNext = () => {
    if (startTime == null) return;
    const endTime = addMinutes(startTime, selectedDuration).toISOString();
    nav.navigate('BookingDetailsScreen', {
      offer_id: offer_id,
      startTime: startTime.toISOString(),
      endTime: endTime,
    });
  };

  return (
    <View className="flex-1 bg-white px-4">
      {/* Header */}
      <View className="flex-row px-0.5 py-3.5">
        <TouchableOpacity className="pr-3" onPress={() => nav.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text className="text-lg ml-3 text-text-dark font-[Inter]">Zarezerwuj lekcję</Text>
      </View>

      <ScrollView>
        {/* Durations */}
        <View className="flex-row py-5 gap-x-3 justify-between">
          {durations.map((duration) => {
            const hours = ~~(duration / 60);
            const minutes = duration % 60;
            let formated_time = '';

            if (hours > 0 && minutes > 0) {
              formated_time = `${hours}h ${minutes}min`;
            } else if (hours > 0) {
              formated_time = `${hours}h`;
            } else {
              formated_time = `${minutes}min`;
            }

            return (
              <Pressable
                key={duration}
                onPress={() => setSelectedDuration(duration)}
                className={`rounded-md px-3 py-1.5 
                ${duration <= maxDuration ? '' : 'opacity-0 pointer-events-none'}
                ${selectedDuration === duration ? 'bg-primary' : 'bg-background-alt'}
              `}
              >
                <Text
                  className={`text-base font-semibold font-[Inter] ${selectedDuration === duration ? 'text-background-alt' : 'text-dark'}`}
                >
                  {formated_time}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Calendar */}
        {offer !== null && (
          <Calendar className="py-6" tutor_id={offer.tutor_id} onSelect={onCalendarSelect} />
        )}

        {/* Time slots */}
        <FlatList
          data={lessonStartTimes}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="py-5"
          renderItem={({ item, index }) => (
            <View className="">
              <Pressable
                key={index}
                onPress={() => setStartTime(item)}
                className={`px-3 py-1.5 rounded-md 
                  ${index == 0 ? '' : 'ml-3'}
                  ${startTime === item ? 'bg-primary' : 'bg-background-alt'}
                `}
              >
                <Text
                  className={`text-base font-semibold font-[Inter] ${startTime === item ? 'text-background-alt' : 'text-text-dark'}`}
                >
                  {format(item, 'HH:mm')}
                </Text>
              </Pressable>
            </View>
          )}
        />

        {/* Lekcja */}
        <View className="py-3">
          <Text className="text-sm text-primary font-[Inter] font-bold mb-2.5">LEKCJA</Text>
          {offer !== null && (
            <LessonDetails
              offer={offer}
              startTime={startTime}
              endTime={startTime !== null ? addMinutes(startTime, selectedDuration) : null}
            />
          )}
        </View>
      </ScrollView>

      {/* Footer buttons */}
      <View
        className="flex-row justify-between px-4 py-3 absolute bottom-0 left-0 right-0 bg-background shadow-xl/70"
        style={{ elevation: 10 }}
      >
        <TouchableOpacity
          className="flex-1 bg-background border border-primary rounded-lg py-2.5 px-11 mr-2"
          onPress={() => nav.goBack()}
        >
          <Text className="text-center font-bold font-[Inter] text-text-dark">Wróć</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-primary rounded-lg py-2.5 px-11 ml-2"
          onPress={handleNext}
        >
          <Text className="text-center font-bold font-[Inter] text-background">Dalej</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingLessonScreen;
