import { create } from "zustand";

interface SearchState {
  country: string;
  city: string;
  setCountry: (country: string) => void;
  setCity: (city: string) => void;
  clearSearch: () => void;
}

export const SEARCH_INITIAL_STATE = {
  country: "",
  city: "",
};

export const useSearchStore = create<SearchState>((set) => ({
  ...SEARCH_INITIAL_STATE,
  setCountry: (country) => set(() => ({ country })),
  setCity: (city) => set(() => ({ city })),
  clearSearch: () => set(() => ({ country: "", city: "" })),
}));
