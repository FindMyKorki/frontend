import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  const [filters, setFiltersState] = useState<Filters>({
    subject: 'Matematyka',
    level: 'Podstawowy',
  });

  const setFilters = (newFilters: Filters) => {
    setFiltersState(newFilters);
  };

  const clearFilters = () => {
    setFiltersState({
      subject: 'Matematyka',
      level: 'Podstawowy',
    });
  };

  const setDateRange = (fromDate?: string, toDate?: string) => {
    setFiltersState({
      ...filters,
      fromDate,
      toDate,
      selectedDate: undefined,
    });
  };

  const setSingleDate = (date?: string) => {
    setFiltersState({
      ...filters,
      selectedDate: date,
      fromDate: undefined,
      toDate: undefined,
    });
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
