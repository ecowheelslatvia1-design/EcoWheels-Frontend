import React, { useState } from "react";
import { getCurrencySymbol } from "../../utils/currencyFormatter";
import "./AccessoriesFilterSidebar.css";

const AccessoriesFilterSidebar = ({
  filters,
  onFilterChange,
  activeFiltersCount,
  onClearFilters,
  total,
  isOpen,
  onClose,
  currency = "USD",
}) => {
  const [expandedSections, setExpandedSections] = useState({
    extendAccessories: true,
    replacementParts: true,
    price: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const handlePriceInputChange = (filterType, value) => {
    const numValue = parseInt(value) || 0;
    if (filterType === "priceMin") {
      const minValue = Math.max(0, Math.min(numValue, filters.priceMax - 1));
      onFilterChange(filterType, minValue);
    } else if (filterType === "priceMax") {
      const maxValue = Math.max(numValue, filters.priceMin + 1);
      onFilterChange(filterType, maxValue);
    }
  };

  // Subcategories for Extend Accessories
  const extendAccessoriesSubcats = [
    "Trailers",
    "Bags",
    "Basket",
    "Rear Rack",
    "Other Accessories",
  ];

  // Subcategories for Replacement Parts
  const replacementPartsSubcats = [
    "Batteries & Chargers",
    "Motor",
    "Brakes",
    "Display",
    "Inner Tubes",
    "Drivetrain",
  ];

  // Model compatibility options
  const modelCompatibility = [
    "Titan",
    "C11",
    "C11 PRO",
    "C21",
    "C22",
    "T1 PRO",
    "T2",
  ];

  return (
    <div className={`filter-sidebar ${isOpen ? "open" : ""}`}>
      <div className="filter-header">
        <div className="filter-header-top">
          <h3 className="filter-title">Filters</h3>
          <button
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close filters"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="filter-header-info">
          <span className="results-count">
            {total} {total === 1 ? "result" : "results"}
          </span>
          {activeFiltersCount > 0 && (
            <button className="clear-filters-btn" onClick={onClearFilters}>
              Clear All ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>

      {/* Extend Accessories */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("extendAccessories")}
          aria-expanded={expandedSections.extendAccessories}
        >
          <span className="filter-section-title">Extend Accessories</span>
          <span
            className={`filter-arrow ${
              expandedSections.extendAccessories ? "expanded" : ""
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        {expandedSections.extendAccessories && (
          <div className="filter-options">
            {extendAccessoriesSubcats.map((subcat) => (
              <label key={subcat} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.subCategory?.includes(subcat) || false}
                  onChange={() => handleCheckboxChange("subCategory", subcat)}
                />
                <span>{subcat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Replacement Parts */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("replacementParts")}
          aria-expanded={expandedSections.replacementParts}
        >
          <span className="filter-section-title">Replacement Parts</span>
          <span
            className={`filter-arrow ${
              expandedSections.replacementParts ? "expanded" : ""
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        {expandedSections.replacementParts && (
          <div className="filter-options">
            {replacementPartsSubcats.map((subcat) => (
              <label key={subcat} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.subCategory?.includes(subcat) || false}
                  onChange={() => handleCheckboxChange("subCategory", subcat)}
                />
                <span>{subcat}</span>
              </label>
            ))}
            <div className="filter-subsection">
              <div className="filter-subsection-title">Model Compatibility</div>
              {modelCompatibility.map((model) => (
                <label key={model} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.compatibility?.includes(model) || false}
                    onChange={() =>
                      handleCheckboxChange("compatibility", model)
                    }
                  />
                  <span>{model}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("price")}
          aria-expanded={expandedSections.price}
        >
          <span className="filter-section-title">Price</span>
          <span
            className={`filter-arrow ${expandedSections.price ? "expanded" : ""}`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        {expandedSections.price && (
          <div className="price-input-container">
            <div className="price-input-group">
              <label className="price-input-label">Min</label>
              <div className="price-input-wrapper">
                <span className="price-currency">
                  {getCurrencySymbol(currency)}
                </span>
                <input
                  type="number"
                  min="0"
                  value={filters.priceMin}
                  onChange={(e) =>
                    handlePriceInputChange("priceMin", e.target.value)
                  }
                  className="price-input"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="price-input-separator">-</div>
            <div className="price-input-group">
              <label className="price-input-label">Max</label>
              <div className="price-input-wrapper">
                <span className="price-currency">
                  {getCurrencySymbol(currency)}
                </span>
                <input
                  type="number"
                  min={filters.priceMin + 1}
                  value={filters.priceMax}
                  onChange={(e) =>
                    handlePriceInputChange("priceMax", e.target.value)
                  }
                  className="price-input"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessoriesFilterSidebar;

