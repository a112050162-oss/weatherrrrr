import React, { useState, useEffect } from 'react';

interface LandscapeProps {
  cityName: string;
}

const Landscape: React.FC<LandscapeProps> = ({ cityName }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const imageUrl = `https://picsum.photos/seed/${cityName.replace(/\s/g, '')}2024/800/600`;

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [imageUrl]);

  return (
    <div className="w-full px-6 py-6 max-w-md mx-auto">
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm bg-indigo-50 border-2 border-indigo-100">
        {!imageLoaded && (
             <div className="absolute inset-0 flex items-center justify-center text-indigo-300 font-display font-medium">
                Loading View...
             </div>
        )}
        <img
          src={imageUrl}
          alt={`${cityName} landscape`}
          className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Landscape;