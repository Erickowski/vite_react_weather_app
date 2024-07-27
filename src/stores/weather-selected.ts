import { create } from "zustand";

import { WeatherFormatted } from "@src/types";

interface WeatherSelectedState {
  weathers: WeatherFormatted[];
  addWeather: (weather: WeatherFormatted) => void;
}

export const useWeatherSelectedStore = create<WeatherSelectedState>((set) => ({
  weathers: [],
  addWeather: (weather) =>
    set((state) => ({ weathers: [...state.weathers, weather] })),
}));
