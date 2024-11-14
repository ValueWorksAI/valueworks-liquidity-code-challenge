import React, { useState, useEffect } from 'react';
import CompanyDropdown from './components/CompanyDropdown';
import DataTable from './components/DataTable';
import ThemeSwitch from './components/ThemeSwitch';
import Filters from './components/Filters';
import Search from './components/Search';
import { Company, Row } from './types';
import { useTheme } from './context/ThemeContext';
import './styles/App.css';

const App: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [showFullTime, setShowFullTime] = useState(true);
  const [showPartTime, setShowPartTime] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { theme } = useTheme();

  useEffect(() => {
    fetch('http://localhost:3000/analysis/')
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      });
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      setRows(selectedCompany.rows || []);
    }
  }, [selectedCompany]);

  const filteredRows = rows
    .filter((row) => {
      const isFullTime = row.type === 'Full-time';
      const isPartTime = row.type === 'Part-time';
      return (showFullTime && isFullTime) || (showPartTime && isPartTime);
    })
    .filter((row) => row.name.toLowerCase().includes(searchTerm.toLowerCase()));

  function onCompanySelect(id: string) {
    const company = companies.find((c) => c.id === id);
    
    if (company) {
      setSelectedCompany(company);
    } else {
      setSelectedCompany(null);
    }
  }

  return (
    <div className={theme}>
      <h1 className="app-title">ValueWorks Liquidity Code Challenge</h1>
      <ThemeSwitch />
      <CompanyDropdown
        companies={companies}
        onSelect={onCompanySelect}
      />
      <Filters
        showFullTime={showFullTime}
        showPartTime={showPartTime}
        onFullTimeChange={() => setShowFullTime(!showFullTime)}
        onPartTimeChange={() => setShowPartTime(!showPartTime)}
      />
      <Search onSearch={setSearchTerm} />
      <DataTable rows={filteredRows} />
    </div>
  );
};

export default App;
