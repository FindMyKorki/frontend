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
  isSameMonth,
  addDays,
  subDays,
  setDate,
} from 'date-fns';
import { pl } from 'date-fns/locale';
import AntDesign from '@expo/vector-icons/AntDesign';

type CalendarDay = {
  day: number;
  isCurrentMonth: boolean;
  isInUse: boolean;
  date: Date | null;
};

type AvailabilityCalendarType = {
  className?: string;
  inUse?: Date[];
  onSelect: (date: Date | null) => void;
};

const WEEK = ['PON', 'WT', 'ŚR', 'CZW', 'PT', 'SOB', 'ND'];
const today = new Date();

const AvailabilityCalendar: FC<AvailabilityCalendarType> = ({
  className = '',
  inUse,
  onSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    setIsloading(true);

    const calendar = daysInCalendar();
    if (!inUse) {
      setCalendarDays(calendar);
      setIsloading(false);
      return;
    }

    updateInUseDays(calendar, inUse);

    setCalendarDays(calendar);
    setIsloading(false);
  }, [currentMonth]);

  useEffect(() => {
    if (!inUse) return;

    setCalendarDays((prev) => {
      let update = [...prev];

      for (let i = 0; i < update.length; i++) {
        update[i].isInUse = false;
      }

      update = updateInUseDays(update, inUse);
      return update;
    });
  }, [inUse]);

  const handlePrevMonth = () => {
    if (isloading) return;

    if (isSameMonth(currentMonth, today)) return;
    setSelectedDay(0);
    onSelect(null);

    const prevMonth = subMonths(currentMonth, 1);

    if (isSameMonth(prevMonth, today)) {
      setCurrentMonth(today);
      return;
    }

    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    if (isloading) return;

    const nextMonth = addMonths(currentMonth, 1);
    setSelectedDay(0);
    onSelect(null);
    setCurrentMonth(setDate(nextMonth, 1));
  };

  function updateInUseDays(calendar: CalendarDay[], inUse: Date[]): CalendarDay[] {
    let monthStart = startOfMonth(currentMonth).getDay();
    monthStart = monthStart == 0 ? 6 : monthStart - 1;

    for (let i = 0; i < inUse.length; i++) {
      if (!isSameMonth(inUse[i], currentMonth)) continue;
      let day = inUse[i].getDate() - 1;
      let idx = day + monthStart;
      calendar[idx].isInUse = true;
    }

    return calendar;
  }

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
        day: i + 1,
        isCurrentMonth: true,
        isInUse: false,
        date: setDate(currentMonth, i + 1),
      }),
    );

    if (prevStart !== 1) {
      const days1: CalendarDay[] = Array.from({ length: prevEnd - prevStart + 1 }, (_, i) => ({
        day: prevStart + i,
        isCurrentMonth: false,
        isInUse: false,
        date: null,
      }));
      days = [...days1, ...days];
    }

    if (nextEnd < 7) {
      const days3: CalendarDay[] = Array.from({ length: nextEnd - nextStart + 1 }, (_, i) => ({
        day: nextStart + i,
        isCurrentMonth: false,
        isInUse: false,
        date: null,
      }));
      days = [...days, ...days3];
    }

    return days;
  }

  const handleDayPress = (day: CalendarDay) => {
    let monthStart = startOfMonth(currentMonth).getDay();
    monthStart = monthStart == 0 ? 5 : monthStart - 2;
    setSelectedDay(day.day);
    onSelect(day.date);
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
              let touchableStyle = `w-10 h-7 items-center justify-center rounded-md`;
              let textStyle = `text-lg/6 font-['Inter']`;

              if (day.isCurrentMonth) {
                if (day.day == selectedDay) {
                  touchableStyle = `${touchableStyle} bg-primary`;
                  textStyle = `${textStyle} text-background font-semibold`;
                } else {
                  touchableStyle = `${touchableStyle} border-2 border-${day.isInUse ? 'primary' : 'background-alt'}`;
                  textStyle = `${textStyle} font-medium`;
                }
              } else {
                touchableStyle = `${touchableStyle}`;
                textStyle = `${textStyle} font-regular`;
              }

              return (
                <View key={day.day}>
                  <TouchableOpacity
                    className={touchableStyle}
                    onPress={() => day.isCurrentMonth && handleDayPress(day)}
                    disabled={!day.isCurrentMonth}
                  >
                    <Text className={textStyle}>{day.day}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export default AvailabilityCalendar;
