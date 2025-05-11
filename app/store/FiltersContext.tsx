import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchLevels, fetchSubjects } from '../services/filtersService';

export type Filters = {
  subject?: string;
  level?: string;
  minPrice?: number;
  maxPrice?: number;
  fromDate?: string;
  toDate?: string;
  selectedDate?: string;
};

type FiltersContextType = {
  filters: Filters;
  setFilters: (newFilters: Filters) => void;
  clearFilters: () => void;
  setDateRange: (fromDate?: string, toDate?: string) => void;
  setSingleDate: (date?: string) => void;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFiltersState] = useState<Filters>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeDefaults = async () => {
      try {
        const [subjects, levels] = await Promise.all([fetchSubjects(), fetchLevels()]);
        if (!initialized && subjects.length > 0 && levels.length > 0) {
          setFiltersState({
            subject: subjects[0].name,
            level: levels[0].level,
          });
          setInitialized(true);
        }
      } catch (error) {
        console.error('Błąd podczas inicjalizacji filtrów:', error);
      }
    };

    initializeDefaults();
  }, [initialized]);

  const setFilters = (newFilters: Filters) => {
    setFiltersState(newFilters);
  };

  const clearFilters = () => {
    setInitialized(false);
    setFiltersState({});
  };

  const setDateRange = (fromDate?: string, toDate?: string) => {
    setFiltersState((prev) => ({
      ...prev,
      fromDate,
      toDate,
      selectedDate: undefined,
    }));
  };

  const setSingleDate = (date?: string) => {
    setFiltersState((prev) => ({
      ...prev,
      selectedDate: date,
      fromDate: undefined,
      toDate: undefined,
    }));
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
        clearFilters,
        setDateRange,
        setSingleDate,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within FiltersProvider');
  }
  return context;
};
