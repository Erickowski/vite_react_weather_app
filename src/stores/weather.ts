import { create } from "zustand";

import { HTTP_STATUS_CODE, QUERY_STATUS, WeatherFormatted } from "@src/types";
import { WEATHER_API } from "@src/api";
import { WeatherAdapter } from "@src/adapters";

interface Weather {
  data: Partial<WeatherFormatted>;
  error: string;
  status: QUERY_STATUS;
}

interface fetchProps {
  city: string;
  country: string;
}

interface WeatherState {
  weather: Weather;
  fetchWeather: ({ city, country }: fetchProps) => void;
  clearWeather: () => void;
}

const INITIAL_STATE = {
  data: {},
  error: "",
  status: QUERY_STATUS.idle,
};

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: INITIAL_STATE,
  fetchWeather: async ({ city, country }: fetchProps) => {
    try {
      set({
        weather: {
          data: {},
          error: "",
          status: QUERY_STATUS.loading,
        },
      });

      const response = await fetch(
        `${WEATHER_API}&q=${city},${country}&aqi=no`
      );

      const data = await response.json();

      if (response.status !== HTTP_STATUS_CODE.ok) {
        set({
          weather: {
            data: {},
            error: data.error.message,
            status: QUERY_STATUS.error,
          },
        });
        return;
      }

      set({
        weather: {
          data: WeatherAdapter(data),
          error: "",
          status: QUERY_STATUS.success,
        },
      });
    } catch (error) {
      set({
        weather: {
          data: {},
          error: "We sorry, something failed.",
          status: QUERY_STATUS.error,
        },
      });
    }
  },
  clearWeather: () => set(() => ({ weather: INITIAL_STATE })),
}));
