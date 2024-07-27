export interface Weather {
  current: {
    condition: {
      icon: string;
    };
    humidity: number;
    temp_c: number;
    wind_mph: number;
  };
  location: {
    country: string;
    name: string;
    region: string;
  };
}

export interface WeatherFormatted {
  icon: string;
  humidity: number;
  tempC: number;
  windMph: number;
  country: string;
  name: string;
  region: string;
}
