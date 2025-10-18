import React from 'react';
import Tooltip from './Tooltip';
import LayoutIcon from './icons/LayoutIcon';

const Header = ({ viewMode, setViewMode }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-primary-700 tracking-tight">
            CORP HUB
          </div>
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 ${viewMode === 'table' ? 'bg-primary-700 text-white rounded-md' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
            >
              <LayoutIcon type="table" className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 ${viewMode === 'cards' ? 'bg-primary-700 text-white rounded-md' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
            >
              <LayoutIcon type="grid" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;