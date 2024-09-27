// Campus Weather tsx

"use client";


import { WeatherData } from "@/types/WeatherData";
import { Location } from "@/types/Location";
import { useEffect, useState } from "react";
import { getWeather } from "@/services";
import { useNotification } from "./providers/NotificationProvider";

type LocationKey = 'Burwood' | 'WaurnPonds' | 'Geelong' | 'Warrnambool';

const locations: Record<LocationKey, Location> = {
  'Burwood': { lat: '-37.847668445273676', lon: '145.11501026545739' },
  'WaurnPonds': { lat: '-38.198063929658225', lon: '144.2989607546584' },
  'Geelong': { lat: '-38.1439740391049', lon: '144.36004841889212' },
  'Warrnambool': { lat: '-38.390886618261625', lon: '142.53845779471277' }
};


const CampusWeather = () => {
  const { addNotification } = useNotification();
  const [weatherData, setWeatherData] = useState<{ [key: string]: WeatherData }>({});
  const [selectedLocation, setSelectedLocation] = useState<string>('Burwood');

  /**
   * Get Campus Weather using API
   */
  useEffect(() => {
    const getCampusWeather = async () => {
      try {
        const weatherPromises = Object.keys(locations).map(async (locationKey) => {
          // Type assertion to LocationKey
          const key = locationKey as LocationKey;
          const data = await getWeather(locations[key]);
          return { [key]: data };
        });

        const results = await Promise.all(weatherPromises);
        const weatherData = results.reduce((acc, result) => ({ ...acc, ...result }), {} as { [key: string]: WeatherData });

        setWeatherData(weatherData);
        setSelectedLocation('Burwood'); // Set default location if needed
      } catch (error) {
        addNotification('Error Fetching Weather Data. Refresh');
        console.error(error);
      }
    };

    getCampusWeather();
  }, [addNotification]);

  /**
   * Handle Location Change
   * @param location 
   */
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <div className="bg-hsl-l100 dark:bg-hsl-l15 px-4 py-8 rounded-lg shadow-md">
      <h2 className="text-mb-pink dark:text-mb-yellow font-medium text-2xl mb-4">{selectedLocation || 'Burwood'}</h2>
      {weatherData[selectedLocation] && (
        <div className=" grid grid-cols-2 grid-rows-1">
          <div>
            <p className="text-sm">{weatherData[selectedLocation].weather.toLocaleUpperCase()}</p>
            <p className="text-4xl font-semibold">{weatherData[selectedLocation].temperature.current.toFixed(1)}°C</p>
          </div>
          <div className="grid grid-cols-2 grid-rows-1">
            <div className="flex flex-col justify-end">
              <p className="text-xs text-hsl-l50">Precipitation: </p>
              <p className="text-xs text-hsl-l50">Wind Speed:</p>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-xs text-hsl-l50">{weatherData[selectedLocation].precipitation.sum} mm</p>
              <p className="text-xs text-hsl-l50">{weatherData[selectedLocation].windSpeed} m/s</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 grid-rows-2 gap-2 mt-8">
        {Object.keys(locations).map((locationKey) => (
          <div key={locationKey} className="flex justify-center items-center text-hsl-l5 dark:text-hsl-l5">
            <button type="button" onClick={() => handleLocationChange(locationKey as LocationKey)}
              className={`bg-hsl-l95 dark:bg-hsl-l20 rounded-3xl px-4 py-1 text-sm font-medium w-max border text-black dark:text-white
                      hover:bg-mb-pink hover:dark:bg-mb-yellow hover:border-mb-pink hover:dark:border-mb-yellow
                    ${locationKey === selectedLocation ? 'border-mb-pink dark:border-mb-yellow'
                  : 'border-hsl-l95 dark:border-hsl-l20'}`}>
              {locationKey}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampusWeather;