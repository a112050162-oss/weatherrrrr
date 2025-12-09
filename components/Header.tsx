import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 flex justify-center items-center bg-transparent pt-8">
      <h1 className="text-4xl font-display font-bold tracking-wide text-amber-400 drop-shadow-sm uppercase">
        WEATHER
      </h1>
    </header>
  );
};

export default Header;