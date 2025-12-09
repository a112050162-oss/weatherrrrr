import { WeatherData } from '../types';

interface OpenMeteoResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
  hourly: {
    time: string[];
    relativehumidity_2m: number[];
    precipitation_probability: number[];
  };
  daily: {
    time: string[];
    sunset: string[];
  };
}

export const fetchWeather = async (lat: number, lng: number): Promise<WeatherData> => {
  try {
    // API 4.1 Specification
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=relativehumidity_2m,precipitation_probability&daily=sunset&timezone=auto`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data: OpenMeteoResponse = await response.json();

    // Process Data Flow (Section 5)
    // 1. Get current hour index to extract humidity and precip probability
    // The API returns hourly data. We need to find the index corresponding to the current time.
    const currentHourISO = new Date().toISOString().slice(0, 13); // Match YYYY-MM-DDTHH
    // Simple heuristic: find the hour in the list that matches current local hour, or just take the first one if exact match fails (data usually starts from 00:00 today)
    const now = new Date();
    const currentHour = now.getHours();
    
    // Open-Meteo hourly returns 24h per day. Index 0 is 00:00 today.
    // However, safest way is to assume index = currentHour if array starts at midnight today.
    // Let's protect against array bounds.
    const hourIndex = Math.min(currentHour, data.hourly.time.length - 1);

    const humidity = data.hourly.relativehumidity_2m[hourIndex] || 0;
    const precip = data.hourly.precipitation_probability[hourIndex] || 0;
    
    // Daily sunset (Index 0 is today)
    const sunsetISO = data.daily.sunset[0];
    const sunsetTime = sunsetISO ? new Date(sunsetISO).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--';

    return {
      temperature: data.current_weather.temperature,
      weatherCode: data.current_weather.weathercode,
      windSpeed: data.current_weather.windspeed,
      humidity: humidity,
      precipitationProb: precip,
      sunset: sunsetTime,
    };
  } catch (error) {
    console.error("Weather Service Error:", error);
    throw error;
  }
};