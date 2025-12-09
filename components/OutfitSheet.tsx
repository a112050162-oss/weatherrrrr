import React, { useState } from 'react';
import { Shirt, X, ThermometerSun, CloudRain, Snowflake, Wind } from 'lucide-react';
import { OutfitRecommendation } from '../types';

interface OutfitSheetProps {
  recommendation: OutfitRecommendation | null;
  loading: boolean;
}

const OutfitSheet: React.FC<OutfitSheetProps> = ({ recommendation, loading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getRecIcon = (type: OutfitRecommendation['iconType']) => {
    // Adding fills to match the theme
    switch (type) {
        case 'cold': return <Snowflake size={64} className="text-sky-400 fill-sky-100" />;
        case 'cool': return <Wind size={64} className="text-teal-400 fill-teal-50" />;
        case 'hot-rain': return <CloudRain size={64} className="text-blue-500 fill-blue-100" />;
        case 'hot-sun': return <ThermometerSun size={64} className="text-orange-400 fill-orange-100" />;
        default: return <Shirt size={64} className="text-indigo-300 fill-indigo-50" />;
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent z-20 flex justify-center pointer-events-none">
        <button
          onClick={() => setIsOpen(true)}
          disabled={loading || !recommendation}
          className="pointer-events-auto w-full max-w-md bg-indigo-600 text-white py-4 px-6 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center space-x-3 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1"
        >
          <Shirt size={22} className="fill-indigo-200" />
          <span className="font-display font-bold text-lg">本日穿搭建議</span>
        </button>
      </div>

      {/* Bottom Sheet / Modal */}
      {isOpen && recommendation && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-indigo-900/30 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Content */}
          <div className="relative w-full max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl transform transition-transform animate-in slide-in-from-bottom-10 duration-300 border-t-2 sm:border-2 border-indigo-100">
            <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-500 rounded-full hover:bg-slate-50 transition-colors"
            >
                <X size={28} strokeWidth={2.5} />
            </button>

            <div className="flex flex-col items-center text-center pt-2">
                <div className="mb-6 p-6 bg-indigo-50 rounded-full ring-4 ring-indigo-50/50">
                    {getRecIcon(recommendation.iconType)}
                </div>
                
                <h3 className="text-2xl font-display font-bold text-slate-800 mb-3">
                    穿搭指南
                </h3>
                
                <p className="text-lg text-slate-600 leading-relaxed font-medium px-2">
                    {recommendation.text}
                </p>

                <button 
                    onClick={() => setIsOpen(false)}
                    className="mt-8 w-full py-4 bg-slate-100 text-slate-700 font-display font-bold text-lg rounded-2xl hover:bg-slate-200 transition-colors"
                >
                    了解
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OutfitSheet;