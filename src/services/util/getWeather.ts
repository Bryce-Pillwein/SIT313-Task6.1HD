import { WeatherData } from "@/types/WeatherData";
import { Location } from "@/types/Location";


/**
 * Get Weather
 * @param loc 
 */
export default async function getWeather(loc: Location): Promise<WeatherData> {
  const apiKey = "a49d613c0b19a514ef915fb34b6f24de"; // I know this is exposed but it is free so it doesnt bother me!
  const { lat, lon } = loc;
  const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";

  const params = new URLSearchParams({
    lat,
    lon,
    appid: apiKey,
    units: 'metric'
  });

  try {
    const response = await fetch(`${baseUrl}?${params}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();

    const now = Math.floor(Date.now() / 1000); // Current time in seconds

    // Find the forecast entry closest to the current time
    const closestForecast = data.list.reduce((prev: any, curr: any) =>
      Math.abs(curr.dt - now) < Math.abs(prev.dt - now) ? curr : prev
    );

    // Extract relevant data from the closest forecast entry
    const weatherData: WeatherData = {
      weather: closestForecast.weather[0].description,
      temperature: {
        current: closestForecast.main.temp,
        min: closestForecast.main.temp_min,
        max: closestForecast.main.temp_max,
      },
      precipitation: {
        sum: closestForecast.rain?.['1h'] || 0,
        probabilityMax: closestForecast.pop || 0,
      },
      windSpeed: closestForecast.wind.speed,
    };

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
