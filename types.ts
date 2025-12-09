export interface City {
  name: string;
  lat: number;
  lng: number;
  country: string;
}

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  precipitationProb: number;
  sunset: string; // ISO string or time string
}

export interface OutfitRecommendation {
  text: string;
  iconType: 'cold' | 'cool' | 'hot-rain' | 'hot-sun';
}