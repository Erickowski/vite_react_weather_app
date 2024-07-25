import { create } from "zustand";

import { CountryFormatted, QUERY_STATUS } from "@src/types";
import { COUNTRIES_API } from "@src/api";
import { CountriesAdapter } from "@src/adapters";

interface Countries {
  data: CountryFormatted;
  status: QUERY_STATUS;
}

interface CountriesState {
  countries: Countries;
  fetchCountries: () => void;
}

const INITIAL_STATE = {
  data: {},
  status: QUERY_STATUS.idle,
};

export const useCountriesStore = create<CountriesState>((set) => ({
  countries: INITIAL_STATE,
  fetchCountries: async () => {
    try {
      set({
        countries: {
          data: {},
          status: QUERY_STATUS.loading,
        },
      });
      const response = await fetch(COUNTRIES_API);

      set({
        countries: {
          data: CountriesAdapter(await response.json()),
          status: QUERY_STATUS.success,
        },
      });
    } catch (error) {
      set({
        countries: {
          data: {},
          status: QUERY_STATUS.error,
        },
      });
    }
  },
}));
