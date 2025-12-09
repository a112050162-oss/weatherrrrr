import React from 'react';
import { City } from '../types';
import { CITIES } from '../constants';
import { MapPin } from 'lucide-react';

interface CitySelectorProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    const city = CITIES.find(c => c.name === cityName);
    if (city) {
      onCityChange(city);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-2">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-indigo-400">
          <MapPin size={20} className="fill-indigo-50" />
        </div>
        <select
          value={selectedCity.name}
          onChange={handleChange}
          className="block w-full pl-12 pr-10 py-4 text-lg text-slate-700 bg-white border-2 border-indigo-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 shadow-sm appearance-none transition-all cursor-pointer font-display font-semibold hover:border-indigo-200"
        >
          {CITIES.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default CitySelector;