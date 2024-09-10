/**
 * Weather Data for Weather API
 */
export interface WeatherData {
  weather: string;
  temperature: {
    current: number;
    min: number;
    max: number;
  };
  uvIndex: number;
  precipitation: {
    sum: number;
    probabilityMax: number;
  };
  windSpeed: number;
}