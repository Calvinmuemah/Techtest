import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'

const PriceRangeFilter = ({ onFilterChange }) => {
  const [activeRange, setActiveRange] = useState(null);
  const [customMin, setCustomMin] = useState('');
  const [customMax, setCustomMax] = useState('');

  const priceRanges = [
    { min: 0, max: 10000, label: 'Under Ksh 10,000' },
    { min: 10000, max: 30000, label: 'Ksh 10,000 - Ksh 30,000' },
    { min: 30000, max: 50000, label: 'Ksh 30,000 - Ksh 50,000' },
    { min: 50000, max: 100000, label: 'Ksh 50,000 - Ksh 1,000,000' },
    { min: 100000, max: 200000, label: 'Ksh 1,000,000 - Ksh 2,000,000' },
    { min: 200000, max: Infinity, label: 'Above Ksh 2,000,000' }
  ];

  const handleRangeClick = (range) => {
    setActiveRange(range.label);
    onFilterChange(range.min, range.max);
    setCustomMin('');
    setCustomMax('');
  };

  const handleCustomRangeApply = (e) => {
    e.preventDefault();

    const min = customMin ? parseInt(customMin, 10) : 0;
    const max = customMax ? parseInt(customMax, 10) : Infinity;

    if (max !== Infinity && min > max) {
      alert('Minimum price cannot be greater than maximum price');
      return;
    }

    setActiveRange('custom');
    onFilterChange(min, max);
  };

  const resetFilters = () => {
    setActiveRange(null);
    setCustomMin('');
    setCustomMax('');
    onFilterChange(0, Infinity);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-white">
        <h5 className="mb-0">Filter by Price</h5>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {priceRanges.map((range) => (
            <motion.li 
              key={range.label} 
              className={`list-group-item border-0 px-0 py-2 ${activeRange === range.label ? 'bg-light' : ''}`}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <button 
                type="button"
                className={`btn btn-sm w-100 text-start ${activeRange === range.label ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => handleRangeClick(range)}
              >
                {range.label}
              </button>
            </motion.li>
          ))}
        </ul>

        <hr />

        <form onSubmit={handleCustomRangeApply} className="mt-3">
          <p className="fw-medium mb-2">Custom Range</p>
          <div className="row g-2">
            <div className="col">
              <input 
                type="number" 
                className="form-control form-control-sm" 
                placeholder="Min"
                value={customMin}
                onChange={(e) => setCustomMin(e.target.value)}
                min="0"
                aria-label="Minimum price"
              />
            </div>
            <div className="col">
              <input 
                type="number" 
                className="form-control form-control-sm" 
                placeholder="Max"
                value={customMax}
                onChange={(e) => setCustomMax(e.target.value)}
                min="0"
                aria-label="Maximum price"
              />
            </div>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button 
              type="submit" 
              className={`btn btn-sm ${activeRange === 'custom' ? 'btn-primary' : 'btn-outline-primary'}`}
              disabled={!customMin && !customMax}
            >
              Apply
            </button>
            {activeRange && (
              <button 
                type="button" 
                className="btn btn-sm btn-outline-secondary"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
