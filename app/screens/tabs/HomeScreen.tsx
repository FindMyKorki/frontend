import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

import SearchBar from '../../components/SearchBar';
import TutorListCard from '../../components/TutorListCard';
import SortDropdown from '../../components/SortDropdown';
import FilterTag from '../../components/FilterTag';
import AppButton from '../../components/AppButton';

import { useFilters } from '../../store/FiltersContext';

const reviewSortOptions = ['Po cenie malejąco', 'Po cenie rosnąco'];

// Sample data - soon will be fetch from database
const tutors = [
  {
    id: '1',
    name: 'Marek Sarmacki',
    price: 100,
    subject: 'Matematyka',
    level: 'Szkoła średnia',
    availableDates: ['2025-05-10', '2025-05-15'],
    description: 'Ze mną analiza matematyczna nie będzie wcale trudna!',
    avatarUri: 'https://randomuser.me/api/portraits/men/10.jpg',
  },
  {
    id: '2',
    name: 'Stan Getz',
    price: 120,
    subject: 'Fizyka',
    level: 'Szkoła podstawowa',
    availableDates: ['2025-05-12'],
    description: 'Jestem Stasiek i dostaję pieniądze za naukę matematyki',
    avatarUri: 'https://randomuser.me/api/portraits/men/15.jpg',
  },
  {
    id: '3',
    name: 'Jessica Polo',
    price: 150,
    subject: 'Matematyka',
    level: 'Szkoła średnia',
    availableDates: ['2025-05-18', '2025-05-20'],
    description: 'Mam imię jak batonik, ale uczę jeszcze lepiej',
    avatarUri: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    id: '4',
    name: 'Marek Polo',
    price: 150,
    subject: 'Matematyka',
    level: 'Podstawowy',
    availableDates: ['2025-05-09'],
    description: 'Uczę studentów matematyki stosowanej',
    avatarUri: 'https://randomuser.me/api/portraits/men/29.jpg',
  },
  {
    id: '5',
    name: 'Anna Nowak',
    price: 90,
    subject: 'Biologia',
    level: 'Podstawowy',
    availableDates: ['2025-05-10', '2025-05-11'],
    description: 'Z pasją do życia i nauki!',
    avatarUri: 'https://randomuser.me/api/portraits/women/20.jpg',
  },
  {
    id: '6',
    name: 'Tomasz Wójcik',
    price: 80,
    subject: 'Chemia',
    level: 'Średni - rozszerzony',
    availableDates: ['2025-05-12', '2025-05-14'],
    description: 'W chemii najważniejsze są reakcje!',
    avatarUri: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '7',
    name: 'Ewa Kowalska',
    price: 200,
    subject: 'Fizyka',
    level: 'Wyższy',
    availableDates: ['2025-05-19'],
    description: 'Specjalistka od mechaniki kwantowej',
    avatarUri: 'https://randomuser.me/api/portraits/women/30.jpg',
  },
  {
    id: '8',
    name: 'Jan Król',
    price: 110,
    subject: 'Matematyka',
    level: 'Podstawowy',
    availableDates: ['2025-05-16', '2025-05-21'],
    description: 'Zajęcia matematyczne z elementami zabawy',
    avatarUri: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    id: '9',
    name: 'Karolina Bąk',
    price: 130,
    subject: 'Chemia',
    level: 'Średni - podstawowy',
    availableDates: ['2025-05-13', '2025-05-14'],
    description: 'Z chemią przez życie!',
    avatarUri: 'https://randomuser.me/api/portraits/women/17.jpg',
  },
  {
    id: '10',
    name: 'Dawid Lewandowski',
    price: 160,
    subject: 'Informatyka',
    level: 'Wyższy',
    availableDates: ['2025-05-10', '2025-05-18'],
    description: 'Algorytmy i struktury danych w praktyce',
    avatarUri: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
];

type Filter = {
  id: string;
  text: string;
  removable?: boolean;
};

export default function HomeScreen() {
  const nav = useNavigation();
  const [sortOption, setSortOption] = useState<string>(reviewSortOptions[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const { filters, setFilters } = useFilters();

  const removeFilter = (idToRemove: keyof typeof filters) => {
    const newFilters = { ...filters };
    delete newFilters[idToRemove];
    setFilters(newFilters);
  };

  const getReadableFilters = (): Filter[] => {
    const readable: Filter[] = [];

    if (filters.subject) readable.push({ id: 'subject', text: filters.subject });
    if (filters.level) readable.push({ id: 'level', text: filters.level });

    if (filters.fromDate) {
      const date = dayjs(filters.fromDate).format('DD.MM.YYYY');
      readable.push({ id: 'fromDate', text: `Od ${date}`, removable: true });
    }

    if (filters.toDate) {
      const date = dayjs(filters.toDate).format('DD.MM.YYYY');
      readable.push({ id: 'toDate', text: `Do ${date}`, removable: true });
    }

    if (filters.minPrice !== undefined)
      readable.push({ id: 'minPrice', text: `Od ${filters.minPrice} PLN`, removable: true });

    if (filters.maxPrice !== undefined)
      readable.push({ id: 'maxPrice', text: `Do ${filters.maxPrice} PLN`, removable: true });

    return readable;
  };

  const getFilteredAndSortedTutors = () => {
    const filtered = tutors.filter((tutor) => {
      const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtracja po cenie
      const matchesMinPrice =
        filters.minPrice !== undefined ? tutor.price >= filters.minPrice : true;
      const matchesMaxPrice =
        filters.maxPrice !== undefined ? tutor.price <= filters.maxPrice : true;

      // Filtracja po przedziale dat
      const matchesFromDate = filters.fromDate
        ? tutor.availableDates.some((date) =>
            dayjs(date).isAfter(dayjs(filters.fromDate).subtract(1, 'day')),
          )
        : true;

      const matchesToDate = filters.toDate
        ? tutor.availableDates.some((date) =>
            dayjs(date).isBefore(dayjs(filters.toDate).add(1, 'day')),
          )
        : true;

      // Filtracja po przedmiocie i poziomie
      const matchesSubject = filters.subject
        ? tutor.subject.toLowerCase() === filters.subject.toLowerCase()
        : true;
      const matchesLevel = filters.level
        ? tutor.level.toLowerCase() === filters.level.toLowerCase()
        : true;

      return (
        matchesSearch &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesFromDate &&
        matchesToDate &&
        matchesSubject &&
        matchesLevel
      );
    });

    // Sortowanie
    switch (sortOption) {
      case 'Po cenie malejąco':
        return filtered.sort((a, b) => b.price - a.price);
      case 'Po cenie rosnąco':
        return filtered.sort((a, b) => a.price - b.price);
      default:
        return filtered;
    }
  };

  const activeFilters = getReadableFilters();

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <SearchBar
        placeholderValue="Wyszukaj korepetytora"
        value={searchQuery}
        onSearch={setSearchQuery}
      />

      {/* Filtrowanie */}
      <View className="my-3 space-y-2">
        <View className="flex-row flex-wrap items-center gap-2">
          <Text className="text-primary font-semibold">Filtry:</Text>
          {activeFilters.map((filter) => (
            <FilterTag
              key={filter.id}
              text={filter.text}
              onRemove={
                filter.removable ? () => removeFilter(filter.id as keyof typeof filters) : undefined
              }
            />
          ))}
          <AppButton
            onPress={() => nav.navigate('Filters')}
            label="Edytuj"
            appearance="outlined"
            rightIcon={<MaterialCommunityIcons name="pencil-outline" size={16} color="#1A5100" />}
          />
        </View>
      </View>

      {/* Sortowanie */}
      <SortDropdown options={reviewSortOptions} onSelect={(option) => setSortOption(option)} />

      {/* Cena info */}
      <View className="flex-row items-center justify-end gap-1 mt-2">
        <MaterialIcons name="info-outline" size={12} color="#1A5100" />
        <Text className="text-xs font-semibold text-primary">Cena za 60 min zajęć</Text>
      </View>

      {/* Lista korepetytorów */}
      <FlatList
        data={getFilteredAndSortedTutors()}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TutorListCard
            name={item.name}
            description={item.description}
            price={item.price}
            onPress={() => nav.navigate('TutorProfile')}
            // onPress={() => nav.navigate('TutorProfile', { tutorId: item.id })}
            avatarUri={item.avatarUri}
          />
        )}
      />
    </View>
  );
}
