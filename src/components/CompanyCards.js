const CompanyCards = ({ companies, onEdit, onDelete }) => {
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

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-300 text-blue-900',
      'bg-green-300 text-green-900',
      'bg-yellow-300 text-yellow-900',
      'bg-red-300 text-red-900',
      'bg-purple-300 text-purple-900',
      'bg-pink-300 text-pink-900',
      'bg-indigo-300 text-indigo-900',
      'bg-teal-300 text-teal-900'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No companies found</div>
        <div className="text-gray-400 text-sm mt-1">Try adjusting your search or filter criteria</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {companies.map((company) => (
        <div key={company.id} className="bg-white rounded-lg border border-gray-200 shadow group shadow-sm transition-all p-4 relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${getAvatarColor(company.name)} flex items-center justify-center text-white text-base font-semibold shadow-sm`}>{getInitials(company.name)}</div>
              <div className="min-w-0 flex-1">
                {company.url ? (
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-primary-700 hover:underline truncate block"
                  >
                    {company.name}
                  </a>
                ) : (
                  <h3 className="text-md font-semibold text-gray-900 truncate">{company.name}</h3>
                )}
                <span className="block text-sm text-gray-600">{company.industry}</span>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="space-y-1 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {company.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {company.employees.toLocaleString()} employees
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              {formatCurrency(company.revenue)}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {company.founded}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex space-x-2">
              <button title="Edit" className="text-primary-700 hover:bg-primary-50 hover:text-primary-800 transition-colors rounded p-1" onClick={() => onEdit(company)}>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button title="Delete" className="text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors rounded p-1" onClick={() => onDelete(company.id)}>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyCards;