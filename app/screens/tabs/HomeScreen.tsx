import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

import SearchBar from '../../components/SearchBar';
import OfferListCard from '../../components/OfferListCard';
import SortDropdown from '../../components/SortDropdown';
import FilterTag from '../../components/FilterTag';
import AppButton from '../../components/AppButton';

import { Level } from '../../types/Level';
import { Subject } from '../../types/Subject';
import { Filters } from '../../store/FiltersContext';
import { ActiveOfferResponse } from '../../types/Offer';

import { useFilters } from '../../store/FiltersContext';
import { fetchSubjects, fetchLevels } from '../../services/filtersService';
import { OffersService } from '../../services/offersService';

const reviewSortOptions = ['Po cenie malejąco', 'Po cenie rosnąco'];

type Filter = {
  id: string;
  text: string;
  removable?: boolean;
};

export default function HomeScreen() {
  const nav = useNavigation();
  const [sortOption, setSortOption] = useState(reviewSortOptions[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleOffersCount, setVisibleOffersCount] = useState(5);

  const { filters, setFilters } = useFilters();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);

  const [offers, setOffers] = useState<ActiveOfferResponse[]>([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);
  const [offersError, setOffersError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [subjectsData, levelsData] = await Promise.all([fetchSubjects(), fetchLevels()]);
        setSubjects(subjectsData);
        setLevels(levelsData);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    setVisibleOffersCount(5);
  }, [
    filters.subject,
    filters.level,
    filters.minPrice,
    filters.maxPrice,
    filters.fromDate,
    filters.toDate,
  ]);

  const getSubjectName = (id?: number) => subjects?.find((s) => s.id === id)?.name || '';

  const getLevelName = (id?: number) => levels?.find((l) => l.id === id)?.level || '';

  const fetchActiveOffers = async () => {
    if (!filters.subject || !filters.level) return;

    try {
      setIsLoadingOffers(true);
      setOffersError(null);

      const data = await OffersService.getActiveOffers(
        filters.level,
        filters.subject,
        filters.fromDate,
        filters.toDate,
        filters.minPrice,
        filters.maxPrice,
        sortOption === 'Po cenie rosnąco' ? 'ASC' : 'DESC',
        visibleOffersCount,
      );

      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
      setOffersError('Nie udało się załadować ofert. Spróbuj ponownie.');
    } finally {
      setIsLoadingOffers(false);
    }
  };

  useEffect(() => {
    if (filters.subject && filters.level) {
      fetchActiveOffers();
    }
  }, [
    filters.subject,
    filters.level,
    filters.minPrice,
    filters.maxPrice,
    filters.fromDate,
    filters.toDate,
    sortOption,
    visibleOffersCount,
  ]);

  // Zmodyfikowana funkcja do ładowania więcej ofert
  const loadMoreOffers = () => {
    setVisibleOffersCount((prev) => prev + 5);
    // Nie trzeba wywoływać fetchActiveOffers, bo zrobi to efekt
  };

  // Zmodyfikowana funkcja do filtrowania
  const getFilteredOffers = () => {
    return offers.filter((offer) => {
      const matchesSearch = offer.tutor_full_name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  };

  const removeFilter = (filterKeyToRemove: keyof Filters) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[filterKeyToRemove];
      return newFilters;
    });
  };

  const getActiveFilters = () => {
    const activeFilters: Filter[] = [];

    if (filters.subject) {
      activeFilters.push({
        id: 'subject',
        text: getSubjectName(filters.subject),
        removable: false,
      });
    }

    if (filters.level) {
      activeFilters.push({
        id: 'level',
        text: getLevelName(filters.level),
        removable: false,
      });
    }

    if (filters.minPrice !== undefined) {
      activeFilters.push({
        id: 'minPrice',
        text: `Od ${filters.minPrice} zł`,
        removable: true,
      });
    }

    if (filters.maxPrice !== undefined) {
      activeFilters.push({
        id: 'maxPrice',
        text: `Do ${filters.maxPrice} zł`,
        removable: true,
      });
    }

    if (filters.fromDate) {
      activeFilters.push({
        id: 'fromDate',
        text: `Od ${dayjs(filters.fromDate).format('DD.MM.YYYY')}`,
        removable: true,
      });
    }

    if (filters.toDate) {
      activeFilters.push({
        id: 'toDate',
        text: `Do ${dayjs(filters.toDate).format('DD.MM.YYYY')}`,
        removable: true,
      });
    }

    return activeFilters;
  };

  const filteredOffers = getFilteredOffers();
  const hasMoreOffers = offers.length >= visibleOffersCount;

  const activeFilters = getActiveFilters();
  const hasRequiredFilters = filters.subject && filters.level;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Ładowanie danych...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <SearchBar
        placeholderValue="Wyszukaj korepetytora"
        value={searchQuery}
        onSearch={setSearchQuery}
      />

      <View className="my-3 space-y-2">
        <View className="flex-row flex-wrap items-center gap-2 my-2">
          <Text className="text-primary font-semibold">Filtry:</Text>
          {activeFilters.length > 0 ? (
            activeFilters.map((filter) => (
              <FilterTag
                key={filter.id}
                text={filter.text}
                onRemove={
                  filter.removable ? () => removeFilter(filter.id as keyof Filters) : undefined
                }
              />
            ))
          ) : (
            <Text className="text-gray-500">Brak aktywnych filtrów</Text>
          )}
          {!hasRequiredFilters ? undefined : (
            <AppButton
              onPress={() => nav.navigate('Filters')}
              label="Edytuj"
              appearance="outlined"
              rightIcon={<MaterialCommunityIcons name="pencil-outline" size={16} color="#1A5100" />}
            />
          )}
        </View>
      </View>

      {!hasRequiredFilters ? (
        <View className="flex-1 justify-center py-5">
          <View className="bg-background-alt p-6 rounded-lg items-center">
            <MaterialIcons name="info" size={32} color="#424242" className="mb-3" />
            <Text className="text-lg font-medium text-text-light text-center mb-2">
              Wybierz filtry, aby znaleźć korepetytora
            </Text>
            <Text className="text-text-light text-center mb-4">
              Aby wyświetlić listę dostępnych korepetytorów, wybierz poszukiwany przedmiot oraz
              poziom nauczania.
            </Text>
            <AppButton onPress={() => nav.navigate('Filters')} label="Wybierz filtry" size="full" />
          </View>
        </View>
      ) : (
        <>
          <SortDropdown options={reviewSortOptions} onSelect={setSortOption} />
          <View className="flex-row items-center justify-end gap-1 mt-2">
            <MaterialIcons name="info-outline" size={12} color="#1A5100" />
            <Text className="text-xs font-semibold text-primary">Cena za 60 min zajęć</Text>
          </View>

          {isLoadingOffers ? (
            <View className="flex-1 justify-center items-center py-10">
              <ActivityIndicator size="large" />
            </View>
          ) : offersError ? (
            <View className="flex-1 justify-center items-center py-10">
              <Text className="text-red-500 mb-4">{offersError}</Text>
              <AppButton onPress={fetchActiveOffers} label="Spróbuj ponownie" />
            </View>
          ) : filteredOffers.length === 0 ? (
            <View className="flex-1 justify-center items-center py-10">
              <Text className="text-gray-500">Brak ofert spełniających kryteria</Text>
            </View>
          ) : (
            <FlatList
              data={filteredOffers.slice(0, visibleOffersCount)}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <OfferListCard
                  name={item.tutor_full_name}
                  price={item.price}
                  description={item.title}
                  onProfilePress={() => nav.navigate('TutorProfile', { tutorId: item.tutor_id })}
                  onBookPress={() => nav.navigate('Booking', { offerId: item.id })}
                  avatarUri={item.tutor_avatar_url}
                />
              )}
              ListFooterComponent={
                hasMoreOffers ? (
                  <View className="items-center mt-4 mb-8">
                    <AppButton
                      onPress={loadMoreOffers}
                      label="Pokaż więcej"
                      appearance="outlined"
                    />
                  </View>
                ) : null
              }
            />
          )}
        </>
      )}
    </View>
  );
}
