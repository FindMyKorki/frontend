import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';

import SearchBar from '../../components/SearchBar';
import OfferListCard from '../../components/filters_screen/OfferListCard';
import SortDropdown from '../../components/SortDropdown';
import FilterTag from '../../components/home_screen/FilterTag';
import AppButton from '../../components/AppButton';

import PriceInfo from '../../components/home_screen/PriceInfo';
import NoFiltersView from '../../components/home_screen/NoFitersView';

import { Level } from '../../types/Level';
import { Subject } from '../../types/Subject';
import { ActiveFilter } from '../../types/ActiveFilter';
import { ActiveOfferResponse } from '../../types/Offer';

import { useFilters } from '../../store/FiltersContext';
import { Filters } from '../../store/FiltersContext';

import { fetchSubjects, fetchLevels } from '../../services/filtersService';
import { OffersService } from '../../services/offersService';

const SORT_OPTIONS = ['Po cenie malejąco', 'Po cenie rosnąco'];
const INITIAL_OFFERS_COUNT = 5;
const LOAD_MORE_INCREMENT = 5;

export default function HomeScreen() {
  const navigation = useNavigation();
  const { filters, setFilters } = useFilters();

  // States
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleOffersCount, setVisibleOffersCount] = useState(INITIAL_OFFERS_COUNT);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);

  const [offers, setOffers] = useState<ActiveOfferResponse[]>([]);
  const [loadingStates, setLoadingStates] = useState({
    isLoading: true,
    isLoadingOffers: false,
  });
  const [offersError, setOffersError] = useState<string | null>(null);

  // Derived values
  const hasRequiredFilters = Boolean(filters.subject && filters.level);
  const activeFilters = useMemo(getActiveFilters, [filters, subjects, levels]);
  const filteredOffers = useMemo(getFilteredOffers, [offers, searchQuery]);
  const hasMoreOffers = offers.length >= visibleOffersCount;
  const displayedOffers = filteredOffers.slice(0, visibleOffersCount);

  // Data fetching
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [subjectsData, levelsData] = await Promise.all([fetchSubjects(), fetchLevels()]);
        setSubjects(subjectsData);
        setLevels(levelsData);
      } finally {
        setLoadingStates((prev) => ({ ...prev, isLoading: false }));
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    setVisibleOffersCount(INITIAL_OFFERS_COUNT);
  }, [
    filters.subject,
    filters.level,
    filters.minPrice,
    filters.maxPrice,
    filters.fromDate,
    filters.toDate,
  ]);

  useEffect(() => {
    if (hasRequiredFilters) {
      fetchActiveOffers();
    }
  }, [filters, sortOption, visibleOffersCount]);

  // Functions
  function getSubjectName(id?: number) {
    return subjects.find((s) => s.id === id)?.name || '';
  }

  function getLevelName(id?: number) {
    return levels.find((l) => l.id === id)?.level || '';
  }

  const fetchActiveOffers = useCallback(async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, isLoadingOffers: true }));
      setOffersError(null);

      const data = await OffersService.getActiveOffers(
        filters.level!,
        filters.subject!,
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
      setLoadingStates((prev) => ({ ...prev, isLoadingOffers: false }));
    }
  }, [filters, sortOption, visibleOffersCount]);

  function getFilteredOffers() {
    return offers.filter((offer) =>
      offer.tutor_full_name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  function getActiveFilters(): ActiveFilter[] {
    const result: ActiveFilter[] = [];

    if (filters.subject) {
      result.push({
        id: 'subject',
        text: getSubjectName(filters.subject),
        removable: false,
      });
    }

    if (filters.level) {
      result.push({
        id: 'level',
        text: getLevelName(filters.level),
        removable: false,
      });
    }

    if (filters.minPrice !== undefined) {
      result.push({
        id: 'minPrice',
        text: `Od ${filters.minPrice} zł`,
        removable: true,
      });
    }

    if (filters.maxPrice !== undefined) {
      result.push({
        id: 'maxPrice',
        text: `Do ${filters.maxPrice} zł`,
        removable: true,
      });
    }

    if (filters.fromDate) {
      result.push({
        id: 'fromDate',
        text: `Od ${dayjs(filters.fromDate).format('DD.MM.YYYY')}`,
        removable: true,
      });
    }

    if (filters.toDate) {
      result.push({
        id: 'toDate',
        text: `Do ${dayjs(filters.toDate).format('DD.MM.YYYY')}`,
        removable: true,
      });
    }

    return result;
  }

  const removeFilter = useCallback(
    (filterKeyToRemove: keyof Filters) => {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
        delete newFilters[filterKeyToRemove];
        return newFilters;
      });
    },
    [setFilters],
  );

  const loadMoreOffers = useCallback(() => {
    setVisibleOffersCount((prev) => prev + LOAD_MORE_INCREMENT);
  }, []);

  const navigateToFilters = useCallback(() => {
    navigation.navigate('Filters');
  }, [navigation]);

  const navigateToTutorProfile = useCallback(
    (tutorId: number) => {
      console.log('TutorProfile');
      navigation.navigate('TutorProfile', { tutorId });
    },
    [navigation],
  );

  const navigateToBooking = useCallback(
    (offerId: number) => {
      console.log('Booking');
      navigation.navigate('BookingLesson', { offerId });
    },
    [navigation],
  );

  // Render functions
  const renderFilterTags = () => (
    <View className="flex-row flex-wrap items-center gap-2 my-2">
      <Text className="text-primary font-semibold">Filtry:</Text>
      {activeFilters.length > 0 ? (
        activeFilters.map((filter) => (
          <FilterTag
            key={filter.id}
            text={filter.text}
            onRemove={filter.removable ? () => removeFilter(filter.id as keyof Filters) : undefined}
          />
        ))
      ) : (
        <Text className="text-gray-500">Brak aktywnych filtrów</Text>
      )}
      {hasRequiredFilters && (
        <AppButton
          onPress={navigateToFilters}
          label="Edytuj"
          appearance="outlined"
          rightIcon={<MaterialIcons name="edit" size={16} color="#1A5100" />}
        />
      )}
    </View>
  );

  const renderOfferItem = useCallback(
    ({ item }: { item: ActiveOfferResponse }) => (
      <OfferListCard
        name={item.tutor_full_name}
        price={item.price}
        description={item.title}
        onProfilePress={() => navigateToTutorProfile(item.tutor_id)}
        onBookPress={() => navigateToBooking(item.id)}
        avatarUri={item.tutor_avatar_url}
      />
    ),
    [navigateToBooking, navigateToTutorProfile],
  );

  const renderFooter = useCallback(
    () =>
      hasMoreOffers ? (
        <View className="items-center mt-4 mb-8">
          <AppButton onPress={loadMoreOffers} label="Pokaż więcej" appearance="outlined" />
        </View>
      ) : null,
    [hasMoreOffers, loadMoreOffers],
  );

  // Loading state
  if (loadingStates.isLoading) {
    return <LoadingView />;
  }

  // Main render
  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <SearchBar
        placeholderValue="Wyszukaj korepetytora"
        value={searchQuery}
        onSearch={setSearchQuery}
      />

      <View className="my-3 space-y-2">{renderFilterTags()}</View>

      {!hasRequiredFilters ? (
        <NoFiltersView onNavigateToFilters={navigateToFilters} />
      ) : (
        <>
          <SortDropdown options={SORT_OPTIONS} onSelect={setSortOption} />
          <PriceInfo />

          {loadingStates.isLoadingOffers ? (
            <LoadingView />
          ) : offersError ? (
            <ErrorView error={offersError} onRetry={fetchActiveOffers} />
          ) : filteredOffers.length === 0 ? (
            <EmptyResultsView />
          ) : (
            <FlatList
              data={displayedOffers}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={renderOfferItem}
              ListFooterComponent={renderFooter}
            />
          )}
        </>
      )}
    </View>
  );
}

// Sub-components for better readability
const LoadingView = () => (
  <View className="flex-1 justify-center items-center py-10 gap-4">
    <Text>Ładowanie danych...</Text>
    <ActivityIndicator size="large" />
  </View>
);

const ErrorView = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <View className="flex-1 justify-center items-center py-10">
    <Text className="text-red-500 mb-4">{error}</Text>
    <AppButton
      onPress={onRetry}
      label="Spróbuj ponownie"
      appearance="outlined"
      className="self-center"
    />
  </View>
);

const EmptyResultsView = () => (
  <View className="flex-1 justify-center items-center py-10">
    <Text className="text-gray-500">Brak ofert spełniających kryteria</Text>
  </View>
);
