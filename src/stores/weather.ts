import { create } from "zustand";

import { QUERY_STATUS } from "@src/types";
import { WEATHER_API } from "@src/api";

interface Weather {
  data: unknown;
  status: QUERY_STATUS;
}

interface fetchProps {
  city: string;
  country: string;
}

interface WeatherState {
  weather: Weather;
  fetchWeather: ({ city, country }: fetchProps) => void;
}

const INITIAL_STATE = {
  data: {},
  status: QUERY_STATUS.idle,
};

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: INITIAL_STATE,
  fetchWeather: async ({ city, country }: fetchProps) => {
    try {
      set({
        weather: {
          data: {},
          status: QUERY_STATUS.loading,
        },
      });
      const response = await fetch(
        `${WEATHER_API}&q=${city},${country}&aqi=no`
      );

      set({
        weather: {
          data: await response.json(),
          status: QUERY_STATUS.success,
        },
      });
    } catch (error) {
      set({
        weather: {
          data: {},
          status: QUERY_STATUS.error,
        },
      });
    }
  },
}));
