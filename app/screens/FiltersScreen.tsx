import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopPanel from '../components/TopPanel';
import SubjectSelector from '../components/filters_screen/SubjectSelector';
import LevelSelector from '../components/filters_screen/LevelSelector';
import PriceSelector from '../components/filters_screen/PriceSelector';
import DateSelector from '../components/filters_screen/DateSelector';
import CalendarModal from '../components/filters_screen/CalendarModal';
import AppButton from '../components/AppButton';
import { Filters, useFilters } from '../store/FiltersContext';
import dayjs from 'dayjs';

// Sample data - soon will be fetch from database
const subjectOptions = [
  'Matematyka',
  'Fizyka',
  'Chemia',
  'Informatyka',
  'Język angielski',
  'Język polski',
  'Historia',
  'WOS',
  'Biologia',
  'Geografia',
  'Plastyka',
  'Muzyka',
];

const recommendedSubjects = ['Matematyka', 'Fizyka', 'Język angielski', 'Informatyka', 'Biologia'];

const FiltersScreen = () => {
  const nav = useNavigation();
  const { filters, setFilters } = useFilters();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [activeInput, setActiveInput] = useState<'start' | 'end'>('start');

  // Local state for temporary filters (not saved yet)
  const [tempFilters, setTempFilters] = useState<Filters>(filters);

  const handleDateChange = (date: Date) => {
    if (activeInput === 'start') {
      setTempFilters({
        ...tempFilters,
        fromDate: date.toISOString(),
        toDate:
          tempFilters.toDate && new Date(tempFilters.toDate) < date
            ? undefined
            : tempFilters.toDate,
      });
    } else {
      setTempFilters({
        ...tempFilters,
        toDate: date.toISOString(),
        fromDate:
          tempFilters.fromDate && new Date(tempFilters.fromDate) > date
            ? undefined
            : tempFilters.fromDate,
      });
    }
  };

  const handleSaveFilters = () => {
    setFilters(tempFilters);
    nav.navigate('Home');
  };
  const levelOptions = ['Podstawowy', 'Średni - podstawowy', 'Średni - rozszerzony', 'Wyższy'];

  return (
    <View className="flex-1">
      <TopPanel onBackPress={() => nav.goBack()} className="bg-white" />

      <ScrollView
        className={`flex-1 px-[14px] bg-white ${calendarVisible ? 'opacity-50' : 'opacity-100'}`}
      >
        <SubjectSelector
          subjectOptions={subjectOptions}
          recommendedSubjects={recommendedSubjects}
          selectedSubject={tempFilters.subject}
          selectSubject={(s) =>
            setTempFilters({ ...tempFilters, subject: s === tempFilters.subject ? undefined : s })
          }
        />

        <LevelSelector
          levelOptions={levelOptions}
          selectedLevel={tempFilters.level ?? null}
          selectLevel={(l) =>
            setTempFilters({ ...tempFilters, level: l === tempFilters.level ? undefined : l })
          }
        />

        <DateSelector
          startDate={tempFilters.fromDate ? new Date(tempFilters.fromDate) : new Date()}
          endDate={
            tempFilters.toDate ? new Date(tempFilters.toDate) : dayjs().add(7, 'day').toDate()
          }
          onChangeStartDate={(date) =>
            setTempFilters({ ...tempFilters, fromDate: date.toISOString() })
          }
          onChangeEndDate={(date) => setTempFilters({ ...tempFilters, toDate: date.toISOString() })}
          showCalendar={calendarVisible}
          setShowCalendar={setCalendarVisible}
          activeInput={activeInput}
          setActiveInput={setActiveInput}
        />

        <PriceSelector
          minPrice={tempFilters.minPrice?.toString() || ''}
          maxPrice={tempFilters.maxPrice?.toString() || ''}
          onChangeMin={(value) =>
            setTempFilters({ ...tempFilters, minPrice: value ? parseFloat(value) : undefined })
          }
          onChangeMax={(value) =>
            setTempFilters({ ...tempFilters, maxPrice: value ? parseFloat(value) : undefined })
          }
        />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white px-[14px] py-3">
        <AppButton label="Zapisz filtry" size="full" onPress={handleSaveFilters} />
      </View>

      <CalendarModal
        visible={calendarVisible}
        selectedDate={
          activeInput === 'start'
            ? tempFilters.fromDate
              ? new Date(tempFilters.fromDate)
              : new Date()
            : tempFilters.toDate
              ? new Date(tempFilters.toDate)
              : dayjs().add(7, 'day').toDate()
        }
        onClose={() => setCalendarVisible(false)}
        onSelectDate={handleDateChange}
      />
    </View>
  );
};

export default FiltersScreen;
