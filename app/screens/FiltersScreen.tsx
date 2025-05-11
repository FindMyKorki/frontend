import { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
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
import { fetchLevels, fetchSubjects } from '../services/filtersService';

const FiltersScreen = () => {
  const nav = useNavigation();
  const { filters, setFilters } = useFilters();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [activeInput, setActiveInput] = useState<'start' | 'end'>('start');

  const [levelOptions, setLevelOptions] = useState<string[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  const [recommendedSubjects, setRecommendedSubjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [tempFilters, setTempFilters] = useState<Filters>(filters);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const levels = await fetchLevels();
        const subjects = await fetchSubjects();

        setLevelOptions(levels.map((l) => l.level));

        const subjectNames = subjects.map((s) => s.name);
        setSubjectOptions(subjectNames);

        let recommended = subjectNames.slice(0, 6);
        if (tempFilters.subject && !recommended.includes(tempFilters.subject)) {
          recommended.push(tempFilters.subject);
        }

        setRecommendedSubjects(recommended);
      } catch (err) {
        console.error('Błąd ładowania danych filtrów:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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

  return (
    <View className="flex-1 bg-white">
      <TopPanel onBackPress={() => nav.goBack()} className="bg-white" />

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-base text-gray-700">Ładowanie danych filtrów...</Text>
        </View>
      ) : (
        <ScrollView
          className={`flex-1 px-[14px] ${calendarVisible ? 'opacity-50' : 'opacity-100'}`}
        >
          {subjectOptions.length > 0 && recommendedSubjects.length > 0 && (
            <SubjectSelector
              subjectOptions={subjectOptions}
              recommendedSubjects={recommendedSubjects}
              selectedSubject={tempFilters.subject}
              selectSubject={(s) =>
                setTempFilters({
                  ...tempFilters,
                  subject: s === tempFilters.subject ? undefined : s,
                })
              }
            />
          )}

          <LevelSelector
            levelOptions={levelOptions}
            selectedLevel={tempFilters.level ?? null}
            selectLevel={(l) =>
              setTempFilters({ ...tempFilters, level: l === tempFilters.level ? undefined : l })
            }
          />

          <DateSelector
            startDate={tempFilters.fromDate ? new Date(tempFilters.fromDate) : undefined}
            endDate={tempFilters.toDate ? new Date(tempFilters.toDate) : undefined}
            onChangeStartDate={(date) =>
              setTempFilters({ ...tempFilters, fromDate: date.toISOString() })
            }
            onChangeEndDate={(date) =>
              setTempFilters({ ...tempFilters, toDate: date.toISOString() })
            }
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
      )}

      {!isLoading && (
        <View className="absolute bottom-0 left-0 right-0 bg-white px-[14px] py-3">
          <AppButton label="Zapisz filtry" size="full" onPress={handleSaveFilters} />
        </View>
      )}

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
