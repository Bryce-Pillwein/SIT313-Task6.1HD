// Home Page tsx

"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
import { useNotification } from "@/components/providers/NotificationProvider";
import PostCard from "@/components/post/PostCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCalcTrending, getWeather, setTrendingPostIds } from "@/services";
import { WeatherData } from "@/types/WeatherData";
import { Location } from "@/types/Location";

type LocationKey = 'Burwood' | 'WaurnPonds' | 'Geelong' | 'Warrnambool';

const locations: Record<LocationKey, Location> = {
  'Burwood': { lat: '-37.847668445273676', lon: '145.11501026545739' },
  'WaurnPonds': { lat: '-38.198063929658225', lon: '144.2989607546584' },
  'Geelong': { lat: '-38.1439740391049', lon: '144.36004841889212' },
  'Warrnambool': { lat: '-38.390886618261625', lon: '142.53845779471277' }
};


export default function HomePage() {
  const { addNotification } = useNotification();
  const [trending, setTrending] = useState<Post[]>([]);
  const [weatherData, setWeatherData] = useState<{ [key: string]: WeatherData }>({});
  const [selectedLocation, setSelectedLocation] = useState<string>('Burwood');


  useEffect(() => {
    const getTrendingPost = async () => {
      try {
        // Re calculate Trending Post
        const posts = await getCalcTrending();
        setTrending(posts);
        // Reset calculated trending posts
        const postIds = posts.map(post => post.postId);
        await setTrendingPostIds(postIds);
      } catch (error) {
        addNotification('Error Fetching Post. Refresh');
        console.error(error);
      }
    };

    getTrendingPost();
  }, []);


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
  }, []);

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <main>
      <Header />
      <div className="relative w-full min-h-[75vw] sm:min-h-[50vw] md:min-h-[20vw] overflow-hidden flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/deakin-cover-1.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-hsl-l98 to-transparent pointer-events-none"></div>
      </div>


      <div className="app-container">


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div></div>
          <div></div>

          {/* Weather On Campus */}
          <div className="bg-[#58bcaf] dark:bg-[#2b5b54] p-4 rounded-lg shadow-md">
            <h2 className="text-mb-pink dark:text-mb-yellow font-medium text-2xl">{selectedLocation || 'Burwood'}</h2>
            {weatherData[selectedLocation] && (
              <div className="text-hsl-l100 grid grid-cols-2 grid-rows-1">
                <div>
                  <p className="text-sm">{weatherData[selectedLocation].weather.toLocaleUpperCase()}</p>
                  <p className="text-4xl font-semibold">{weatherData[selectedLocation].temperature.current.toFixed(1)}°C</p>
                </div>
                <div className="grid grid-cols-2 grid-rows-1">
                  <div className="flex flex-col justify-end">
                    <p className="text-xs text-[#36766d]">UV Index:</p>
                    <p className="text-xs text-[#36766d]">Precipitation: </p>
                    <p className="text-xs text-[#36766d]">Wind Speed:</p>
                  </div>
                  <div className="flex flex-col justify-end">
                    <p className="text-xs text-[#36766d]">{weatherData[selectedLocation].uvIndex}</p>
                    <p className="text-xs text-[#36766d]">{weatherData[selectedLocation].precipitation.sum} mm</p>
                    <p className="text-xs text-[#36766d]">{weatherData[selectedLocation].windSpeed} m/s</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 grid-rows-2 gap-2 mt-8">
              {Object.keys(locations).map((locationKey) => (
                <div key={locationKey} className="flex justify-center items-center text-hsl-l5 dark:text-hsl-l5">
                  <button type="button" onClick={() => handleLocationChange(locationKey as LocationKey)}
                    className={`bg-hsl-l95 dark:bg-hsl-l80 rounded-3xl px-4 py-1 text-sm font-medium w-max border 
                      hover:bg-mb-pink hover:dark:bg-mb-yellow hover:border-mb-pink hover:dark:border-mb-yellow
                    ${locationKey === selectedLocation ? 'border-mb-pink dark:border-mb-yellow'
                        : 'border-hsl-l95 dark:border-hsl-l80'}`}>
                    {locationKey}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Trending Post */}
        {trending && (trending.length > 0) && (
          <div>
            <h1 className="font-semibold text-3xl ml-4 mt-8 mb-2">Trending</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trending.map((post, idx) => (
                <PostCard key={idx} pd={post} isGridView={true} />
              ))}
            </div>
          </div>
        )}




      </div>


      <Footer />
    </main >
  );
}
