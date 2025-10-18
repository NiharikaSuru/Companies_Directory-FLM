import React from 'react';
import SortIcon from './icons/SortIcon';
import Tooltip from './Tooltip';

const CompanyTable = ({ companies, sortBy, sortOrder, onSort, onEdit, onDelete }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(amount);
  };

  const getIndustryColor = (industry) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Finance': 'bg-green-100 text-green-800',
      'Environmental': 'bg-emerald-100 text-emerald-800',
      'Agriculture': 'bg-yellow-100 text-yellow-800',
      'Food': 'bg-orange-100 text-orange-800',
      'Travel': 'bg-purple-100 text-purple-800',
      'Security': 'bg-red-100 text-red-800',
      'Energy': 'bg-amber-100 text-amber-800'
    };
    return colors[industry] || 'bg-gray-100 text-gray-800';
  };

  const SortableHeader = ({ field, children, className = "" }) => (
    <th 
      className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer ${className}`}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <SortIcon 
          direction={sortBy === field ? sortOrder : null}
          className="h-4 w-4 text-gray-400"
        />
      </div>
    </th>
  );

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <SortableHeader field="id">ID</SortableHeader>
              <SortableHeader field="name">Company</SortableHeader>
              <SortableHeader field="industry">Industry</SortableHeader>
              <SortableHeader field="location">Location</SortableHeader>
              <SortableHeader field="employees">Employees</SortableHeader>
              <SortableHeader field="revenue">Revenue</SortableHeader>
              <SortableHeader field="founded">Founded</SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <Tooltip content={company.id} className="break-words max-w-xs">
                    <span>{company.id}</span>
                  </Tooltip>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Tooltip content={company.name} className="break-words max-w-xs">
                    <span className="text-sm font-medium text-primary-700 hover:text-primary-800 cursor-pointer">
                      {company.name}
                    </span>
                  </Tooltip>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Tooltip content={company.industry} className="break-words max-w-xs">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getIndustryColor(company.industry)}`}>
                      {company.industry}
                    </span>
                  </Tooltip>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <Tooltip content={company.location} className="break-words max-w-xs">
                    <span>{company.location}</span>
                  </Tooltip>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <Tooltip content={company.employees.toLocaleString()} className="break-words max-w-xs">
                    <span>{company.employees.toLocaleString()}</span>
                  </Tooltip>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <Tooltip content={formatCurrency(company.revenue)} className="break-words max-w-xs">
                    <span>{formatCurrency(company.revenue)}</span>
                  </Tooltip>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <Tooltip content={company.founded} className="break-words max-w-xs">
                    <span>{company.founded}</span>
                  </Tooltip>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm space-x-2">
                  <Tooltip content="Edit Company" className="break-words max-w-xs">
                    <button className="text-primary-700 hover:text-primary-800 transition-colors" onClick={() => onEdit(company)}>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </Tooltip>
                  <Tooltip content="Delete Company" className="break-words max-w-xs">
                    <button className="text-red-600 hover:text-red-800 transition-colors" onClick={() => onDelete(company.id)}>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {companies.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No companies found</div>
          <div className="text-gray-400 text-sm mt-1">Try adjusting your search or filter criteria</div>
        </div>
      )}
    </div>
  );
};

export default CompanyTable;