import React, { useEffect, useState, FC, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  addDays,
  subDays,
  setDate,
  addHours,
} from 'date-fns';
import { pl } from 'date-fns/locale';
import AntDesign from '@expo/vector-icons/AntDesign';
import AvailabilityModal from './AvailabilityModal';
import { apiCall } from '../utils/ApiHandler';

type TimeBlock = {
  start_date: string;
  end_date: string;
};

type CalendarDay = {
  day: number;
  isCurrentMonth: boolean;
  isAvailable: boolean;
  times: TimeBlock[];
};

type CalendarType = {
  tutor_id: string;
  className?: string;
  onSelect?: (block: TimeBlock[]) => void;
};

const WEEK = ['PON', 'WT', 'ŚR', 'CZW', 'PT', 'SOB', 'ND'];
const earliestDate = addHours(new Date(), 2);

const Calendar: FC<CalendarType> = ({ tutor_id, className = '', onSelect }) => {
  {
    /*for booking pass onSelect, for profile dont pass onSelect*/
  }
  const calendarRef = useRef<View>(null);
  const [calendarTop, setCalendarTop] = useState(0);

  const [currentMonth, setCurrentMonth] = useState(earliestDate);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  const fetchAvailableBlocks = async () => {
    setIsloading(true);

    const data = (await apiCall({
      method: 'GET',
      url: `/tutors/${tutor_id}/available-hours?start_date=${format(currentMonth, 'yyyy-MM-dd')}T${format(currentMonth, 'HH:mm:ss')}`,
    })) as { available_blocks: TimeBlock[] };

    const blocks: TimeBlock[] = data.available_blocks;
    const calendar = daysInCalendar();

    let monthStart = startOfMonth(currentMonth).getDay();
    monthStart = monthStart == 0 ? 6 : monthStart - 1;

    for (let i = 0; i < blocks.length; i++) {
      let day = parseInt(blocks[i].start_date.substring(8, 10)) - 1;
      let idx = day + monthStart;
      calendar[idx].isAvailable = true;
      calendar[idx].times.push(blocks[i]);
    }

    setCalendarDays(calendar);
    setIsloading(false);
  };

  useEffect(() => {
    fetchAvailableBlocks();
  }, [currentMonth, tutor_id]);

  const handlePrevMonth = () => {
    if (isloading) return;

    if (isSameMonth(currentMonth, earliestDate)) return;
    setSelectedDay(0);

    const prevMonth = subMonths(currentMonth, 1);

    if (isSameMonth(prevMonth, earliestDate)) {
      setCurrentMonth(earliestDate);
      return;
    }

    prevMonth.setHours(0, 0, 0, 0);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    if (isloading) return;

    const nextMonth = addMonths(currentMonth, 1);
    setSelectedDay(0);
    setCurrentMonth(setDate(nextMonth, 1));
  };

  function daysInCalendar(): CalendarDay[] {
    const startMonth = startOfMonth(currentMonth);
    const prevStart = startOfWeek(startMonth, { weekStartsOn: 1 }).getDate();
    const prevEnd = subDays(startMonth, 1).getDate();

    const endMonth = endOfMonth(currentMonth);
    const nextStart = addDays(endMonth, 1).getDate();
    const nextEnd = endOfWeek(endMonth, { weekStartsOn: 1 }).getDate();

    let days: CalendarDay[] = Array.from(
      { length: endMonth.getDate() - startMonth.getDate() + 1 },
      (_, i) => ({
        day: startMonth.getDate() + i,
        isCurrentMonth: true,
        isAvailable: false,
        times: [],
      }),
    );

    if (prevStart !== 1) {
      const days1: CalendarDay[] = Array.from({ length: prevEnd - prevStart + 1 }, (_, i) => ({
        day: prevStart + i,
        isCurrentMonth: false,
        isAvailable: false,
        times: [],
      }));
      days = [...days1, ...days];
    }

    if (nextEnd < 7) {
      const days3: CalendarDay[] = Array.from({ length: nextEnd - nextStart + 1 }, (_, i) => ({
        day: nextStart + i,
        isCurrentMonth: false,
        isAvailable: false,
        times: [],
      }));
      days = [...days, ...days3];
    }

    return days;
  }

  const handleDayPress = (day: CalendarDay) => {
    if (calendarRef.current) {
      calendarRef.current.measure((_x, _y, _width, _height, _pageX, pageY) => {
        setCalendarTop(pageY + _height - 50);
      });
    }

    let monthStart = startOfMonth(currentMonth).getDay();
    monthStart = monthStart == 0 ? 5 : monthStart - 2;
    setSelectedDay(day.day);
    onSelect?.(calendarDays[day.day + monthStart].times);
  };

  function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  return (
    <View className={className} ref={calendarRef}>
      <View className="pb-4 flex-row justify-between items-center">
        <TouchableOpacity onPress={handlePrevMonth} className="items-center justify-center w-7 h-7">
          <AntDesign name="left" size={15} color="#000000" />
        </TouchableOpacity>

        <Text className="text-lg font-bold font-['Inter'] color-text-light">
          {format(currentMonth, 'LLLL yyyy', { locale: pl }).toUpperCase()}
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

      <View className="flex-wrap w-full">
        {chunkArray(calendarDays, 7).map((week, weekIndex) => (
          <View key={weekIndex} className="flex-row pt-4 w-full justify-between">
            {week.map((day) => {
              const isSelected =
                (selectedDay == day.day && day.isCurrentMonth) ||
                (onSelect == null && day.isAvailable);

              return (
                <View key={day.day}>
                  <TouchableOpacity
                    className={`w-10 h-7 items-center justify-center rounded-md 
                    ${day.isCurrentMonth && !(day.isAvailable || isSelected) ? 'border-2 border-background-alt' : ' '}
                    ${day.isAvailable ? (isSelected ? 'bg-primary' : 'bg-background-alt') : ' '} 
                  `}
                    onPress={() => day.isAvailable && handleDayPress(day)}
                    disabled={!day.isAvailable}
                  >
                    <Text
                      className={`text-lg/6 font-['Inter'] 
                    ${day.isAvailable ? 'font-semibold' : ' '} 
                    ${!day.isCurrentMonth ? 'text-text-medium' : 'font-medium'} 
                    ${isSelected ? 'text-background' : ' '}
                    `}
                    >
                      {day.day}
                    </Text>
                  </TouchableOpacity>
                  {onSelect == null && day.isAvailable ? (
                    <AvailabilityModal
                      visible={day.day == selectedDay}
                      onClose={() => setSelectedDay(0)}
                      selectedDate={setDate(currentMonth, day.day)}
                      dates={day.times}
                      top={calendarTop}
                    />
                  ) : (
                    <></>
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Calendar;
