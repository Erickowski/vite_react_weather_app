import { create } from "zustand";

interface SearchState {
  country: string;
  city: string;
  setCountry: (country: string) => void;
  setCity: (city: string) => void;
}

const INITIAL_STATE = {
  country: "Select some country",
  city: "",
};

export const useSearchStore = create<SearchState>((set) => ({
  country: INITIAL_STATE.country,
  city: INITIAL_STATE.city,
  setCountry: (country) => set(() => ({ country })),
  setCity: (city) => set(() => ({ city })),
}));
