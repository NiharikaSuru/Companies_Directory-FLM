import React from 'react';
import SearchIcon from './icons/SearchIcon';
import LayoutIcon from './icons/LayoutIcon';
import Tooltip from './Tooltip';

const FilterControls = ({
  searchTerm,
  setSearchTerm,
  selectedIndustry,
  setSelectedIndustry,
  selectedCompany,
  setSelectedCompany,
  companies,
  industries,
  viewMode,
  setViewMode,
  totalResults
}) => {
  const companyNames = [...new Set(companies.map(c => c.name))].sort();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-700 focus:border-primary-700 text-sm"
            />
          </div>

          {/* Company Filter */}
          <div className="min-w-0 flex-1 max-w-xs">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-700 focus:border-primary-700 text-sm"
            >
              <option value="">Select Company</option>
              {companyNames.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          <div className="min-w-0 flex-1 max-w-xs">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-700 focus:border-primary-700 text-sm"
            >
              <option value="">Select Industry</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center justify-between lg:justify-end space-x-4">
          <div className="text-sm text-gray-600">
            {totalResults} {totalResults === 1 ? 'result' : 'results'}
          </div>
          
          <div className="flex items-center space-x-2">
            <Tooltip content="Add Company">
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 transition-colors">
                + Add Company
              </button>
            </Tooltip>
            
            <div className="flex items-center border border-gray-300 rounded-md">
              <Tooltip content="Table View">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 ${viewMode === 'table' ? 'bg-primary-700 text-white' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                >
                  <LayoutIcon type="table" className="h-4 w-4" />
                </button>
              </Tooltip>
              <Tooltip content="Card View">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-1.5 ${viewMode === 'cards' ? 'bg-primary-700 text-white' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                >
                  <LayoutIcon type="grid" className="h-4 w-4" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;