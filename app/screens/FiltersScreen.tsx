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

import { fetchLevels, fetchSubjects } from '../services/filtersService';
import { Filters, useFilters } from '../store/FiltersContext';
import dayjs from 'dayjs';
import { Level } from '../types/Level';
import { Subject } from '../types/Subject';

const FiltersScreen = () => {
  const nav = useNavigation();
  const { filters, setFilters } = useFilters();
  const [tempFilters, setTempFilters] = useState<Filters>(filters);

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [activeInput, setActiveInput] = useState<'start' | 'end'>('start');

  const [levels, setLevels] = useState<Level[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [recommendedSubjects, setRecommendedSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTempFilters(filters);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const levelsData = await fetchLevels();
        const subjectsData = await fetchSubjects();

        setLevels(levelsData);
        setSubjects(subjectsData);

        const recommended = subjectsData.slice(0, 6);
        if (tempFilters.subject) {
          const selected = subjectsData.find((s) => s.id === tempFilters.subject);
          if (selected && !recommended.find((s) => s.id === selected.id)) {
            recommended.push(selected);
          }
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
        <>
          <ScrollView
            className={`flex-1 px-[14px] ${calendarVisible ? 'opacity-50' : 'opacity-100'}`}
          >
            {subjects.length > 0 && recommendedSubjects.length > 0 && (
              <SubjectSelector
                subjects={subjects}
                recommendedSubjects={recommendedSubjects}
                selectedSubjectId={tempFilters.subject ?? undefined}
                selectSubject={(id: number | undefined) =>
                  setTempFilters({
                    ...tempFilters,
                    subject: id === tempFilters.subject ? undefined : id,
                  })
                }
              />
            )}

            <LevelSelector
              levels={levels}
              selectedLevelId={tempFilters.level ?? undefined}
              onSelect={(id) =>
                setTempFilters({ ...tempFilters, level: id === tempFilters.level ? undefined : id })
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

          <View className="bg-white px-[14px] py-3">
            <AppButton label="Zapisz filtry" size="full" onPress={handleSaveFilters} />
          </View>
        </>
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
