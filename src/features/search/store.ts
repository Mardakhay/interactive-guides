import { create } from 'zustand';
import type { SearchFilter, SearchState } from './types';

interface SearchStore extends SearchState {
  setQuery: (query: string) => void;
  setFilter: (filter: SearchFilter) => void;
  reset: () => void;
}

const DEFAULT_STATE: SearchState = {
  query: '',
  filter: 'all',
};

export const useSearchStore = create<SearchStore>((set) => ({
  ...DEFAULT_STATE,

  setQuery: (query) => set({ query }),
  setFilter: (filter) => set({ filter }),
  reset: () => set(DEFAULT_STATE),
}));
