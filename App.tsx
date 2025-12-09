import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CitySelector from './components/CitySelector';
import WeatherInfo from './components/WeatherInfo';
import Landscape from './components/Landscape';
import OutfitSheet from './components/OutfitSheet';
import { CITIES, DEFAULT_CITY } from './constants';
import { City, WeatherData, OutfitRecommendation } from './types';
import { fetchWeather } from './services/weatherService';
import { getOutfitRecommendation } from './services/recommendationService';

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City>(DEFAULT_CITY);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recommendation, setRecommendation] = useState<OutfitRecommendation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // FR-02: Fetch weather when city changes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      setWeather(null);
      setRecommendation(null);
      
      try {
        const data = await fetchWeather(selectedCity.lat, selectedCity.lng);
        setWeather(data);
        
        // FR-04: Generate recommendation immediately after weather data is present
        const rec = getOutfitRecommendation(data);
        setRecommendation(rec);
      } catch (err) {
        setError("無法取得天氣資訊，請稍後再試");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      {/* 2.1 Header */}
      <Header />

      <main className="flex flex-col items-center w-full max-w-screen-sm mx-auto">
        
        {/* 2.2 City Selection */}
        <CitySelector 
            selectedCity={selectedCity} 
            onCityChange={setSelectedCity} 
        />

        {/* Error State */}
        {error && (
            <div className="w-full px-6 py-4 mb-4">
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-center text-sm">
                    {error}
                </div>
            </div>
        )}

        {/* 2.3 Weather Info */}
        <WeatherInfo 
            weather={weather} 
            loading={loading}
            cityName={selectedCity.name}
        />

        {/* 2.4 Landscape */}
        <Landscape cityName={selectedCity.name} />

      </main>

      {/* 2.5 Action & Bottom Sheet */}
      <OutfitSheet 
        recommendation={recommendation}
        loading={loading}
      />
    </div>
  );
};

export default App;