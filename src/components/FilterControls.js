import { useMemo } from 'react';
import ReactSelect, { components as RSComponents } from 'react-select';
import SearchIcon from './icons/SearchIcon';


const FilterControls = ({
  searchTerm,
  setSearchTerm,
  selectedIndustry,
  setSelectedIndustry,
  selectedCompany,
  setSelectedCompany,
  companies,
  industries,
  openAddPopup,
  exportToCSV
}) => {
  // Memoized company options for dropdown
  const companyNames = useMemo(() => [...new Set(companies.map(c => c.name))].sort(), [companies]);
  const companyOptions = companyNames.map(n => ({ value: n, label: n }));

  return (
    <div className="mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filters Row */}
        <div className="flex flex-row flex-wrap gap-4 w-full">
          {/* Search Input */}
          <div className="flex-1 min-w-[180px] max-w-xs">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-200 focus:border-primary-200 text-sm"
              />
            </div>
          </div>

          {/* Company Multi-Select Filter */}
          <div className="flex-1 min-w-[180px] max-w-xs">
            <ReactSelect
              options={companyOptions}
              isMulti
              value={companyOptions.filter(o => selectedCompany?.split(',').includes(o.value))}
              onChange={selected => {
                const names = (selected || []).map(s => s.value);
                setSelectedCompany(names.join(','));
              }}
              placeholder="Select Company"
              className="text-sm"
              classNamePrefix="react-select"
              styles={{
                menu: provided => ({ ...provided, zIndex: 60 }),
                control: provided => ({
                  ...provided,
                  borderColor: '#e5e7eb',
                  boxShadow: 'none',
                  height: '36px',
                  minHeight: '36px',
                }),
                option: (provided, state) => ({
                  ...provided,
                  background: state.isSelected ? (state.isFocused ? '#eef2f5' : '#f8fafc') : (state.isFocused ? '#f1f5f9' : provided.background),
                  color: state.isSelected ? '#0f172a' : provided.color,
                  borderRadius: 6,
                  padding: '8px 10px',
                }),
                valueContainer: provided => ({ ...provided, padding: '2px 6px' }),
              }}
              components={{
                Option: (props) => {
                  const { isSelected, label } = props;
                  return (
                    <RSComponents.Option {...props}>
                      <div className={`flex items-center gap-2 rounded ${isSelected ? 'bg-blue-10 dark:bg-gray-800' : ''}`}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="w-4 h-4"
                        />
                        <span className={`truncate ${isSelected ? 'text-gray-900 dark:text-gray-100' : ''}`}>{label}</span>
                      </div>
                    </RSComponents.Option>
                  );
                },
                ValueContainer: ({ children, ...props }) => {
                  const { getValue } = props;
                  const selected = getValue() || [];
                  if (selected.length === 0) return <RSComponents.ValueContainer {...props}>{children}</RSComponents.ValueContainer>;
                  const first = selected[0];
                  const rest = selected.length - 1;
                  return (
                    <div className="flex items-center gap-2 px-2">
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 rounded-full max-w-[180px] truncate">{first.label}</div>
                        {rest > 0 && (
                          <div className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-200 rounded-full">+{rest}</div>
                        )}
                      </div>
                    </div>
                  );
                }
              }}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
            />
          </div>

          {/* Industry Multi-Select Filter */}
          <div className="flex-1 min-w-[180px] max-w-xs">
            <ReactSelect
              options={industries.map(ind => ({ value: ind, label: ind }))}
              isMulti
              value={industries.filter(ind => selectedIndustry?.split(',').includes(ind)).map(ind => ({ value: ind, label: ind }))}
              onChange={selected => {
                const inds = (selected || []).map(s => s.value);
                setSelectedIndustry(inds.join(','));
              }}
              placeholder="Select Industry"
              className="text-sm"
              classNamePrefix="react-select"
              styles={{
                menu: provided => ({ ...provided, zIndex: 60 }),
                control: provided => ({
                  ...provided,
                  borderColor: '#e5e7eb',
                  boxShadow: 'none',
                  height: '36px',
                  minHeight: '36px',
                }),
                option: (provided, state) => ({
                  ...provided,
                  background: state.isSelected ? (state.isFocused ? '#eef2f5' : '#f8fafc') : (state.isFocused ? '#f1f5f9' : provided.background),
                  color: state.isSelected ? '#0f172a' : provided.color,
                  borderRadius: 6,
                  padding: '8px 10px',
                }),
                valueContainer: provided => ({ ...provided, padding: '2px 6px' }),
              }}
              components={{
                Option: (props) => {
                  const { isSelected, label } = props;
                  return (
                    <RSComponents.Option {...props}>
                      <div className={`flex items-center gap-2 rounded ${isSelected ? 'bg-blue-10 dark:bg-gray-800' : ''}`}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="w-4 h-4"
                        />
                        <span className={`truncate ${isSelected ? 'text-gray-900 dark:text-gray-100' : ''}`}>{label}</span>
                      </div>
                    </RSComponents.Option>
                  );
                },
                ValueContainer: ({ children, ...props }) => {
                  const { getValue } = props;
                  const selected = getValue() || [];
                  if (selected.length === 0) return <RSComponents.ValueContainer {...props}>{children}</RSComponents.ValueContainer>;
                  const first = selected[0];
                  const rest = selected.length - 1;
                  return (
                    <div className="flex items-center gap-2 px-2">
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 rounded-full max-w-[180px] truncate">{first.label}</div>
                        {rest > 0 && (
                          <div className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-200 rounded-full">+{rest}</div>
                        )}
                      </div>
                    </div>
                  );
                }
              }}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
            />
          </div>

          {/* Add Company Button */}
          <div className="flex items-center min-w-[140px] justify-end gap-2">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 transition-colors"
              onClick={openAddPopup}
              type="button"
            >
              + Add Company
            </button>
          </div>
          <div>
              <button
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 border border-primary-700 text-primary-700 bg-transparent hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 rounded-md"
              onClick={exportToCSV}
              title="Download CSV"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;