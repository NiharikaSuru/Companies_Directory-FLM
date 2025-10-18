import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-700 tracking-tight">
              CORP HUB
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary-700 rounded"></div>
              <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;