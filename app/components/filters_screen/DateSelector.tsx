import { View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';

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

const DateSelector = ({ startDate, endDate, setShowCalendar, setActiveInput }: Props) => {
  const safeStartDate = startDate ?? new Date();
  const safeEndDate = endDate ?? dayjs().add(7, 'day').toDate();

  return (
    <View className={`mt-4`}>
      <Text className="mt-4 text-primary font-semibold text-sm mb-2">Termin:</Text>
      <View className="flex-row gap-2">
        <Pressable
          onPress={() => {
            setActiveInput('start');
            setShowCalendar(true);
          }}
          className={`flex-1 flex-row items-center justify-between border-2 bg-white border-background-alt px-2.5 py-[5px] rounded`}
        >
          <Text className="text-black">Od {dayjs(safeStartDate).format('DD.MM.YYYY')}</Text>
          <MaterialIcons name="calendar-today" size={20} />
        </Pressable>

        <Pressable
          onPress={() => {
            setActiveInput('end');
            setShowCalendar(true);
          }}
          className={`flex-1 flex-row items-center justify-between border-2 bg-white border-background-alt px-2.5 py-[5px] rounded`}
        >
          <Text className="text-black">Do {dayjs(safeEndDate).format('DD.MM.YYYY')}</Text>
          <MaterialIcons name="calendar-today" size={20} color="#1A5100" />
        </Pressable>
      </View>
    </View>
  );
};

export default DateSelector;
