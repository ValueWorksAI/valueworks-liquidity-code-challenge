import React, { useState } from 'react';
import { Company } from '../types';

interface Props {
  companies: Company[];
  onSelect: (id: string) => void;
}

const CompanyDropdown: React.FC<Props> = ({ companies, onSelect }) => {
  const [currentCompanyId, setCurrentCompanyId] = useState<string | null>(null)

  return (
    <select
      value={currentCompanyId || ""}
      onChange={(e) => {
        onSelect(e.target.value)
        setCurrentCompanyId(e.target.value)
      }}
    >
      <option value="" disabled>Select a company</option>
      {companies.map((company) => (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      ))}
    </select>
  );
};

export default CompanyDropdown;
