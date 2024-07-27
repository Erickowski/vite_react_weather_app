import { create } from "zustand";

import { WeatherFormatted } from "@src/types";

interface WeatherSelectedState {
  weathers: WeatherFormatted[];
  addWeather: (weather: WeatherFormatted) => void;
  removeWeather: (id: string) => void;
}

export const useWeatherSelectedStore = create<WeatherSelectedState>((set) => ({
  weathers: [],
  addWeather: (weather) =>
    set((state) => ({ weathers: [...state.weathers, weather] })),
  removeWeather: (id) =>
    set((state) => ({
      weathers: state.weathers.filter((element) => element.id !== id),
    })),
}));
