import { create } from 'zustand';
import type { CompanyFilterConfig, CompanyFilters } from '@/entities/company';

const defaultFilters: CompanyFilters = {
  year: '2021',
  industry: 'all',
  scale: 'all'
};

interface CompanyFilterState {
  filters: CompanyFilters;
  config: CompanyFilterConfig | null;
  setFilter: <K extends keyof CompanyFilters>(key: K, value: CompanyFilters[K]) => void;
  setConfig: (config: CompanyFilterConfig) => void;
  reset: () => void;
}

export const useCompanyFilterStore = create<CompanyFilterState>((set) => ({
  filters: defaultFilters,
  config: null,
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    })),
  setConfig: (config) =>
    set((state) => ({
      config,
      filters: {
        year: state.filters.year ?? config.years[0]?.value ?? '',
        industry: state.filters.industry ?? config.industries[0]?.value ?? 'all',
        scale: state.filters.scale ?? config.scales[0]?.value ?? 'all'
      }
    })),
  reset: () => set({ filters: defaultFilters })
}));

export const selectFilters = (state: CompanyFilterState) => state.filters;
export const selectConfig = (state: CompanyFilterState) => state.config;
