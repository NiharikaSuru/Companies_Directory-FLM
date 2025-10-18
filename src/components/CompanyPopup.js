
import React, { useState, useEffect } from 'react';

const initialState = {
  name: '',
  industry: '',
  website: '',
  revenue: 0,
  employees: 1,
  founded: new Date().getFullYear(),
  city: '',
  state: '',
  country: 'United States',
  zip: '',
  description: '',
};

const industries = [
  'Technology', 'Finance', 'Environmental', 'Agriculture', 'Food', 'Travel', 'Security', 'Energy'
];
const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'India', 'Germany', 'France', 'Japan', 'China'
];

function CompanyPopup({ isOpen, onClose, onSave, company }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (company) {
      setForm({
        ...initialState,
        ...company
      });
    } else {
      setForm(initialState);
    }
  }, [company, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{company ? 'Edit Company' : 'Add New Company'}</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const location = [form.city, form.state, form.country].filter(Boolean).join(', ');
          const companyData = {
            ...form,
            location,
          };
          onSave(companyData);
        }} className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Company description" className="w-full border px-3 py-2 rounded" rows={2} required />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter company name" className="w-full border px-3 py-2 rounded" required />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Industry</label>
            <select name="industry" value={form.industry} onChange={handleChange} className="w-full border px-3 py-2 rounded" required>
              <option value="">Select industry</option>
              {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Website</label>
            <input type="url" name="website" value={form.website} onChange={handleChange} placeholder="https://example.com" className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Annual Revenue (USD)</label>
            <input type="number" name="revenue" value={form.revenue} onChange={handleChange} min="0" className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Founded Year</label>
            <input type="number" name="founded" value={form.founded} onChange={handleChange} min="1800" max={new Date().getFullYear()} className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Number of Employees</label>
            <input type="number" name="employees" value={form.employees} onChange={handleChange} min="1" className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">City</label>
            <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="San Francisco" className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">State/Province</label>
            <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="California" className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Country</label>
            <select name="country" value={form.country} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">ZIP/Postal Code</label>
            <input type="text" name="zip" value={form.zip} onChange={handleChange} placeholder="94105" className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="col-span-2 flex justify-end gap-2 mt-8">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 bg-white rounded hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">{company ? 'Update' : 'Add Company'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyPopup;
