import { City } from './types';

// FR-01: Built-in City List
export const CITIES: City[] = [
  { name: 'Taipei City', lat: 25.0330, lng: 121.5654, country: 'Taiwan' },
  { name: 'London', lat: 51.5074, lng: -0.1278, country: 'UK' },
  { name: 'New York', lat: 40.7128, lng: -74.0060, country: 'USA' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, country: 'Japan' },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, country: 'France' },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, country: 'Australia' },
];

export const DEFAULT_CITY = CITIES[0];

// WMO Weather Codes mapping helpers
export const isRainy = (code: number): boolean => {
  // Codes 51-67, 80-82, 95-99 typically involve rain/drizzle/thunder
  return (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 95);
};

// Map WMO codes to simple descriptions for debugging or accessibility
export const getWeatherDescription = (code: number): string => {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 67) return 'Rainy';
  if (code <= 77) return 'Snowy';
  if (code <= 82) return 'Rain Showers';
  if (code <= 86) return 'Snow Showers';
  return 'Thunderstorm';
};