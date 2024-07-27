import { v4 as uuidv4 } from "uuid";

import { Weather } from "@src/types";

export function WeatherAdapter(weather: Weather) {
  return {
    id: uuidv4(),
    icon: `https:${weather.current.condition.icon}`,
    humidity: weather.current.humidity,
    tempC: weather.current.temp_c,
    windMph: weather.current.wind_mph,
    country: weather.location.country,
    name: weather.location.name,
    region: weather.location.region,
  };
}
