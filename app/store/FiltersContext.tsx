import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type Filters = {
  subject?: number;
  level?: number;
  minPrice?: number;
  maxPrice?: number;
  fromDate?: string;
  toDate?: string;
};

type SetFiltersType = (newFilters: Filters | ((prevFilters: Filters) => Filters)) => void;

type FiltersContextType = {
  filters: Filters;
  setFilters: SetFiltersType;
  clearFilters: () => void;
  setDateRange: (fromDate?: string, toDate?: string) => void;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFiltersState] = useState<Filters>({});

  const setFilters: SetFiltersType = useCallback((newFilters) => {
    if (typeof newFilters === 'function') {
      setFiltersState(newFilters);
    } else {
      setFiltersState((prev) => ({ ...prev, ...newFilters }));
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState({});
  }, []);

  const setDateRange = useCallback(
    (fromDate?: string, toDate?: string) => {
      setFilters((prev) => ({
        ...prev,
        ...(fromDate !== undefined && { fromDate }),
        ...(toDate !== undefined && { toDate }),
      }));
    },
    [setFilters],
  );

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
        clearFilters,
        setDateRange,
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
