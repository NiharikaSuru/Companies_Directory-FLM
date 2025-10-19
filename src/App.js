import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import FilterControls from './components/FilterControls';
import CompanyTable from './components/CompanyTable';
import CompanyCards from './components/CompanyCards';
import Pagination from './components/Pagination';
import LoadingSkeleton from './components/LoadingSkeleton';
import CompanyForm from './components/CompanyForm';
import companiesData from './data/companies.json';

function App() {
  // Export table data to CSV
  const exportToCSV = () => {
    const headers = [
      'ID', 'Company', 'Industry', 'Location', 'Employees', 'Revenue', 'Founded'
    ];
    const rows = paginatedCompanies.map(c => [
      c.id,
      c.name,
      c.industry,
      c.location,
      c.employees,
      c.revenue,
      c.founded
    ]);
    const csvContent = [headers, ...rows]
      .map(row => row.map(val => `"${String(val).replace(/"/g, '""')}` ).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'companies_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setCompanies(companiesData.companies);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  // Add company
  const handleAddCompany = (company) => {
    const newId = companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1;
    setCompanies([...companies, { ...company, id: newId }]);
    setPopupOpen(false);
    setEditingCompany(null);
  };

  // Edit company
  const handleEditCompany = (company) => {
    setCompanies(companies.map(c => c.id === company.id ? company : c));
    setPopupOpen(false);
    setEditingCompany(null);
  };

  // Delete company
  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter(c => c.id !== id));
    setConfirmDeleteOpen(false);
    setConfirmDeleteId(null);
  };

  const openDeleteConfirm = (id) => {
    setConfirmDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  // Open popup for add
  const openAddPopup = () => {
    setEditingCompany(null);
    setPopupOpen(true);
  };

  // Open popup for edit
  const openEditPopup = (company) => {
    setEditingCompany(company);
    setPopupOpen(true);
  };

  // Filter and sort companies
  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company => {
      const matchesSearch = searchTerm ? company.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
      const matchesIndustry = selectedIndustry ? selectedIndustry.split(',').includes(company.industry) : false;
      const matchesCompany = selectedCompany ? selectedCompany.split(',').includes(company.name) : false;
      // If no filters, show all
      if (!searchTerm && !selectedIndustry && !selectedCompany) return true;
      // OR condition: match if any filter matches
      return matchesSearch || matchesIndustry || matchesCompany;
    });

    // Sort companies
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [companies, searchTerm, selectedIndustry, selectedCompany, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = filteredAndSortedCompanies.slice(startIndex, startIndex + itemsPerPage);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedIndustry, selectedCompany, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header viewMode={viewMode} setViewMode={setViewMode} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          companies={companies}
          industries={companiesData.industries}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={filteredAndSortedCompanies.length}
          openAddPopup={openAddPopup}
          exportToCSV={exportToCSV}
        />

        {loading ? (
          <LoadingSkeleton viewMode={viewMode} />
        ) : (
          <>
            {viewMode === 'table' ? (
              <CompanyTable
                companies={paginatedCompanies}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
                onEdit={openEditPopup}
                onDelete={openDeleteConfirm}
              />
            ) : (
              <CompanyCards
                companies={paginatedCompanies}
                onEdit={openEditPopup}
                onDelete={openDeleteConfirm}
              />
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalResults={filteredAndSortedCompanies.length}
                itemsPerPage={itemsPerPage}
              />
            )}
          </>
        )}
        {confirmDeleteOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm relative">
              <div className="text-lg font-semibold mb-2">Confirm Delete</div>
              <div className="text-gray-700 mb-4">Are you sure you want to delete this company?</div>
              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={() => { setConfirmDeleteOpen(false); setConfirmDeleteId(null); }}>Cancel</button>
                <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={() => handleDeleteCompany(confirmDeleteId)}>Delete</button>
              </div>
            </div>
          </div>
        )}
        {popupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-0 w-full max-w-2xl relative">
              <CompanyForm
                company={editingCompany}
                onSubmit={editingCompany ? handleEditCompany : handleAddCompany}
                onCancel={() => { setPopupOpen(false); setEditingCompany(null); }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;