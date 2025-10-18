import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import FilterControls from './components/FilterControls';
import CompanyTable from './components/CompanyTable';
import CompanyCards from './components/CompanyCards';
import Pagination from './components/Pagination';
import LoadingSkeleton from './components/LoadingSkeleton';
import CompanyPopup from './components/CompanyPopup';
import companiesData from './data/companies.json';

function App() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
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
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
      const matchesCompany = !selectedCompany || company.name === selectedCompany;
      
      return matchesSearch && matchesIndustry && matchesCompany;
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
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            onClick={openAddPopup}
          >
            Add Company
          </button>
        </div>
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
                onDelete={handleDeleteCompany}
              />
            ) : (
              <CompanyCards
                companies={paginatedCompanies}
                onEdit={openEditPopup}
                onDelete={handleDeleteCompany}
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
        <CompanyPopup
          isOpen={popupOpen}
          onClose={() => { setPopupOpen(false); setEditingCompany(null); }}
          onSave={editingCompany ? handleEditCompany : handleAddCompany}
          company={editingCompany}
        />
      </main>
    </div>
  );
}

export default App;