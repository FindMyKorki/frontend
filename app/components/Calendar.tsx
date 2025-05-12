import React, { useEffect, useState, FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addDays,
  setDay,
} from 'date-fns';
import { pl } from 'date-fns/locale';
import AntDesign from '@expo/vector-icons/AntDesign';

type TimeBlock = {
  start_date: string;
  end_date: string;
};

type CalendarType = {
  tutor_id: string;
  className?: string;
  onSelect?: (block: TimeBlock[]) => void;
};

const WEEK = ['PON', 'WT', 'ŚR', 'CZW', 'PT', 'SOB', 'ND'];
const tomorrow = addDays(new Date(), 1);

const Calendar: FC<CalendarType> = ({ tutor_id, className = '', onSelect }) => {
  const [currentDate, setCurrentDate] = useState(tomorrow);
  const [availableBlocks, setAvailableBlocks] = useState<TimeBlock[]>([]);
  const [selectedBlocks, setSelectedBlocks] = useState<TimeBlock[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAvailableBlocks = async () => {
    setLoading(true);

    // Example data
    setAvailableBlocks([
      {
        start_date: '2025-05-03T18:16:56.531000+00:00',
        end_date: '2025-05-03T20:16:56.531000+00:00',
      },
      {
        start_date: '2025-05-04T10:00:00+00:00',
        end_date: '2025-05-04T12:00:00+00:00',
      },
      {
        start_date: '2025-05-04T18:16:56.531000+00:00',
        end_date: '2025-05-04T20:16:56.531000+00:00',
      },
      {
        start_date: '2025-05-05T10:00:00+00:00',
        end_date: '2025-05-05T12:00:00+00:00',
      },
      {
        start_date: '2025-05-05T13:00:00+00:00',
        end_date: '2025-05-05T16:00:00+00:00',
      },
      {
        start_date: '2025-05-05T18:16:56.531000+00:00',
        end_date: '2025-05-05T20:16:56.531000+00:00',
      },
      {
        start_date: '2025-05-06T10:00:00+00:00',
        end_date: '2025-05-06T12:00:00+00:00',
      },
      {
        start_date: '2025-05-19T13:00:00+00:00',
        end_date: '2025-05-19T16:00:00+00:00',
      },
      {
        start_date: '2025-05-19T18:16:56.531000+00:00',
        end_date: '2025-05-19T20:16:56.531000+00:00',
      },
      {
        start_date: '2025-05-20T10:00:00+00:00',
        end_date: '2025-05-20T12:00:00+00:00',
      },
      {
        start_date: '2025-05-20T18:16:56.531000+00:00',
        end_date: '2025-05-20T20:16:56.531000+00:00',
      },
      {
        start_date: '2025-05-21T10:00:00+00:00',
        end_date: '2025-05-21T12:00:00+00:00',
      },
      {
        start_date: '2025-05-21T13:00:00+00:00',
        end_date: '2025-05-21T15:00:00+00:00',
      },
      {
        start_date: '2025-05-21T18:16:56.531000+00:00',
        end_date: '2025-05-21T20:16:56.531000+00:00',
      },
      {
        start_date: '2025-06-21T18:16:56.531000+00:00',
        end_date: '2025-06-21T20:16:56.531000+00:00',
      },
      {
        start_date: '2025-06-21T13:00:00+00:00',
        end_date: '2025-06-21T15:00:00+00:00',
      },
      {
        start_date: '2025-06-21T18:16:56.531000+00:00',
        end_date: '2025-06-21T20:16:56.531000+00:00',
      },
      {
        start_date: '2025-06-5T18:16:56.531000+00:00',
        end_date: '2025-06-5T20:16:56.531000+00:00',
      },
    ]);

    setLoading(false);
  };

  useEffect(() => {
    fetchAvailableBlocks();
  }, [currentDate, tutor_id]);

  const handlePrevMonth = () => {
    if (isSameMonth(currentDate, tomorrow)) return;

    const prevMonth = subMonths(currentDate, 1);
    if (isSameMonth(prevMonth, tomorrow)) {
      setCurrentDate(tomorrow);
      return;
    }

    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentDate, 1);
    setDay(nextMonth, 1);
    setCurrentDate(nextMonth);
  };

  const daysInCalendar = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 }),
  });

  const dateHasAvailability = (date: Date) => {
    return availableBlocks.some((block) => isSameDay(new Date(block.start_date), date));
  };

  const handleDayPress = (date: Date) => {
    const blocks = availableBlocks.filter((block) => isSameDay(new Date(block.start_date), date));
    setSelectedBlocks(blocks);
    onSelect?.(blocks);
  };

  function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  return (
    <View className={className}>
      <View className="pb-4 flex-row justify-between items-center">
        <TouchableOpacity onPress={handlePrevMonth} className="items-center justify-center w-7 h-7">
          <AntDesign name="left" size={15} color="#000000" />
        </TouchableOpacity>

        <Text className="text-lg font-bold font-['Inter'] color-text-light">
          {format(currentDate, 'LLLL yyyy', { locale: pl }).toUpperCase()}
        </Text>

        <TouchableOpacity onPress={handleNextMonth} className="items-center justify-center w-7 h-7">
          <AntDesign name="right" size={15} color="#000000" />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between py-3">
        {WEEK.map((day) => (
          <Text
            key={day}
            className="w-10 h-5 text-center font-semibold text-base color-text-light font-['Inter']"
          >
            {day}
          </Text>
        ))}
      </View>

      {loading ? (
        <></>
      ) : (
        <View className="flex-wrap w-full">
          {chunkArray(daysInCalendar, 7).map((week, weekIndex) => (
            <View key={weekIndex} className="flex-row pt-4 w-full justify-between">
              {week.map((day) => {
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isAvailable = dateHasAvailability(day);
                const isSelected =
                  selectedBlocks.length > 0
                    ? isSameDay(new Date(selectedBlocks[0].start_date), day)
                    : false;

                return (
                  <TouchableOpacity
                    key={day.toISOString()}
                    className={`w-10 h-7 items-center justify-center rounded-md 
                      ${isCurrentMonth && !(isAvailable || isSelected) ? 'border-2 border-background-alt' : ' '}
                      ${isAvailable ? (isSelected ? 'bg-primary' : 'bg-background-alt') : ' '} 
                    `}
                    onPress={() => isAvailable && handleDayPress(day)}
                    disabled={!isAvailable}
                  >
                    <Text
                      className={`text-lg/6 font-['Inter'] 
                      ${isAvailable ? 'font-semibold' : ' '} 
                      ${!isCurrentMonth ? 'text-text-medium' : 'font-medium'} 
                      ${isSelected ? 'text-background' : ' '}
                      `}
                    >
                      {day.getDate()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Calendar;
