import React from 'react';
import { WeatherData } from '../types';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudSnow, 
  CloudFog, 
  Wind, 
  Droplets, 
  Umbrella, 
  Sunset 
} from 'lucide-react';
import { getWeatherDescription } from '../constants';

interface WeatherInfoProps {
  weather: WeatherData | null;
  loading: boolean;
  cityName: string;
}

const WeatherIcon: React.FC<{ code: number }> = ({ code }) => {
  // Enhanced styling to match the reference: Filled colors, softer strokes
  const iconProps = { size: 64, strokeWidth: 2 };
  
  if (code === 0) return <Sun {...iconProps} className="text-amber-500 fill-amber-200" />;
  if (code <= 3) return <Cloud {...iconProps} className="text-sky-400 fill-sky-100" />;
  if (code <= 48) return <CloudFog {...iconProps} className="text-slate-400 fill-slate-200" />;
  if (code <= 67) return <CloudRain {...iconProps} className="text-blue-500 fill-blue-200" />;
  if (code <= 77) return <CloudSnow {...iconProps} className="text-indigo-300 fill-indigo-100" />;
  if (code <= 82) return <CloudRain {...iconProps} className="text-blue-600 fill-blue-300" />;
  if (code <= 86) return <CloudSnow {...iconProps} className="text-indigo-400 fill-indigo-200" />;
  if (code >= 95) return <CloudLightning {...iconProps} className="text-purple-500 fill-purple-200" />;
  
  return <Sun {...iconProps} className="text-amber-500 fill-amber-200" />;
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather, loading, cityName }) => {
  if (loading || !weather) {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-pulse w-full max-w-sm mx-auto">
            <div className="w-32 h-40 bg-white rounded-3xl border-2 border-slate-100"></div>
            <div className="w-32 h-8 bg-slate-200 rounded-full"></div>
            <div className="w-48 h-12 bg-slate-200 rounded-lg"></div>
        </div>
    );
  }

  const description = getWeatherDescription(weather.weatherCode);

  return (
    <div className="flex flex-col items-center w-full px-6 py-2">
      
      {/* Main Weather Card - Matches the reference image style */}
      <div className="flex flex-col items-center justify-center bg-white border-2 border-indigo-100 rounded-3xl p-8 mb-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] w-48 aspect-[3/4] transition-transform hover:scale-105 duration-300">
        <div className="mb-4">
          <WeatherIcon code={weather.weatherCode} />
        </div>
        <span className="text-lg font-display font-semibold text-slate-600 text-center leading-tight">
            {description}
        </span>
      </div>

      {/* City Name */}
      <h2 className="text-2xl font-display font-bold text-slate-700 mb-2">{cityName}</h2>

      {/* Main Temperature */}
      <div className="text-7xl font-display font-bold text-slate-800 mb-8 tracking-tight drop-shadow-sm">
        {Math.round(weather.temperature)}°
      </div>

      {/* Grid Stats - Styled with same border theme */}
      <div className="w-full max-w-sm grid grid-cols-3 gap-3">
        {/* Precipitation */}
        <div className="flex flex-col items-center p-3 bg-white rounded-2xl border-2 border-indigo-50 shadow-sm">
          <Umbrella size={24} className="text-blue-400 fill-blue-50 mb-1" />
          <span className="text-base font-bold text-slate-700">{weather.precipitationProb}%</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Precip</span>
        </div>

        {/* Humidity */}
        <div className="flex flex-col items-center p-3 bg-white rounded-2xl border-2 border-indigo-50 shadow-sm">
          <Droplets size={24} className="text-cyan-400 fill-cyan-50 mb-1" />
          <span className="text-base font-bold text-slate-700">{weather.humidity}%</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Humidity</span>
        </div>

        {/* Sunset */}
        <div className="flex flex-col items-center p-3 bg-white rounded-2xl border-2 border-indigo-50 shadow-sm">
          <Sunset size={24} className="text-orange-400 fill-orange-50 mb-1" />
          <span className="text-base font-bold text-slate-700">{weather.sunset}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Sunset</span>
        </div>
        
        {/* Wind Speed */}
        <div className="col-span-3 flex items-center justify-center p-4 bg-white rounded-2xl border-2 border-indigo-50 shadow-sm mt-1">
             <Wind size={20} className="text-slate-400 mr-3" />
             <span className="text-sm text-slate-500 font-medium">Wind Speed: <span className="font-bold text-slate-700">{weather.windSpeed} km/h</span></span>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;