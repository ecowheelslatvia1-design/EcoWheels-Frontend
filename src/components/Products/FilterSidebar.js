import React, { useState } from "react";
import "./FilterSidebar.css";

const FilterSidebar = ({ filters, onFilterChange, activeFiltersCount, onClearFilters, total, isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    drivetrain: true,
    electricAssistRange: true,
    payload: true,
    riderHeight: true,
    suspension: true,
    colors: true,
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

  const handleSliderChange = (filterType, value) => {
    onFilterChange(filterType, parseFloat(value));
  };

  return (
    <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="filter-header">
        <div className="filter-header-top">
          <span className="results-count">{total} of {total} results</span>
          <button className="sidebar-close-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {activeFiltersCount > 0 && (
          <button className="clear-filters-btn" onClick={onClearFilters}>
            Clear Filters ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Style Buttons */}
      <div className="filter-section style-buttons">
        <button
          className={`style-btn ${filters.style === "Upright" ? "active" : ""}`}
          onClick={() => onFilterChange("style", "Upright")}
        >
          Upright
        </button>
        <button
          className={`style-btn ${filters.style === "Active" ? "active" : ""}`}
          onClick={() => onFilterChange("style", "Active")}
        >
          Active
        </button>
        <button
          className={`style-btn ${filters.style === "Sporty" ? "active" : ""}`}
          onClick={() => onFilterChange("style", "Sporty")}
        >
          Sporty
        </button>
      </div>

      {/* Drivetrain */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => toggleSection("drivetrain")}>
          <span className="filter-section-title">Drivetrain</span>
          <span className={`filter-arrow ${expandedSections.drivetrain ? "expanded" : ""}`}>▼</span>
        </div>
        {expandedSections.drivetrain && (
          <div className="filter-options">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.drivetrain.includes("Chain")}
                onChange={() => handleCheckboxChange("drivetrain", "Chain")}
              />
              <span>Chain</span>
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.drivetrain.includes("Belt")}
                onChange={() => handleCheckboxChange("drivetrain", "Belt")}
              />
              <span>Belt</span>
            </label>
          </div>
        )}
      </div>

      {/* Electric Assist Range */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => toggleSection("electricAssistRange")}>
          <span className="filter-section-title">Electric Assist Range</span>
          <span className={`filter-arrow ${expandedSections.electricAssistRange ? "expanded" : ""}`}>▼</span>
        </div>
        {expandedSections.electricAssistRange && (
          <div className="filter-options">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.electricAssistRange.includes("43-60 mile")}
                onChange={() => handleCheckboxChange("electricAssistRange", "43-60 mile")}
              />
              <span>43-60 mile</span>
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.electricAssistRange.includes(">60 mile")}
                onChange={() => handleCheckboxChange("electricAssistRange", ">60 mile")}
              />
              <span>&gt;60 mile</span>
            </label>
          </div>
        )}
      </div>

      {/* Payload */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => toggleSection("payload")}>
          <span className="filter-section-title">Payload</span>
          <span className={`filter-arrow ${expandedSections.payload ? "expanded" : ""}`}>▼</span>
        </div>
        {expandedSections.payload && (
          <div className="filter-options">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.payload.includes("264lbs")}
                onChange={() => handleCheckboxChange("payload", "264lbs")}
              />
              <span>264lbs</span>
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.payload.includes("440lbs")}
                onChange={() => handleCheckboxChange("payload", "440lbs")}
              />
              <span>440lbs</span>
            </label>
          </div>
        )}
      </div>

      {/* Rider Height */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => toggleSection("riderHeight")}>
          <span className="filter-section-title">Rider Height</span>
          <span className={`filter-arrow ${expandedSections.riderHeight ? "expanded" : ""}`}>▼</span>
        </div>
        {expandedSections.riderHeight && (
          <div className="filter-options">
            {[
              "150cm(4'11\") - 185cm(6'1\")",
              "155cm(5'1\") - 185cm(6'1\")",
              "160cm(5'3\") - 190cm(6'3\")",
              "165cm(5'5\") - 195cm(6'5\")",
            ].map((height) => (
              <label key={height} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.riderHeight.includes(height)}
                  onChange={() => handleCheckboxChange("riderHeight", height)}
                />
                <span>{height}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Suspension */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => toggleSection("suspension")}>
          <span className="filter-section-title">Suspension</span>
          <span className={`filter-arrow ${expandedSections.suspension ? "expanded" : ""}`}>▼</span>
        </div>
        {expandedSections.suspension && (
          <div className="filter-options">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.suspension.includes("Front Suspension")}
                onChange={() => handleCheckboxChange("suspension", "Front Suspension")}
              />
              <span>Front Suspension</span>
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.suspension.includes("Full Suspension")}
                onChange={() => handleCheckboxChange("suspension", "Full Suspension")}
              />
              <span>Full Suspension</span>
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.suspension.includes("No Suspension / Rigid Fork")}
                onChange={() => handleCheckboxChange("suspension", "No Suspension / Rigid Fork")}
              />
              <span>No Suspension / Rigid Fork</span>
            </label>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => toggleSection("colors")}>
          <span className="filter-section-title">Colors</span>
          <span className={`filter-arrow ${expandedSections.colors ? "expanded" : ""}`}>▼</span>
        </div>
        {expandedSections.colors && (
          <div className="filter-options">
            {["White", "Green", "Blue", "Grey", "Black"].map((color) => (
              <label key={color} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.colors.includes(color)}
                  onChange={() => handleCheckboxChange("colors", color)}
                />
                <span>{color}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Slider */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => toggleSection("price")}>
          <span className="filter-section-title">Price</span>
          <span className={`filter-arrow ${expandedSections.price ? "expanded" : ""}`}>▼</span>
        </div>
        {expandedSections.price && (
          <div className="filter-slider-container">
            <div className="slider-values">
              <span>${filters.priceMin}</span>
              <span>${filters.priceMax}</span>
            </div>
            <div className="slider-wrapper price-slider-wrapper">
              <input
                type="range"
                min="499"
                max="1799"
                step="10"
                value={filters.priceMin}
                onChange={(e) => {
                  const newValue = Math.min(parseInt(e.target.value), filters.priceMax - 10);
                  handleSliderChange("priceMin", newValue);
                }}
                className="slider slider-min"
              />
              <input
                type="range"
                min="499"
                max="1799"
                step="10"
                value={filters.priceMax}
                onChange={(e) => {
                  const newValue = Math.max(parseInt(e.target.value), filters.priceMin + 10);
                  handleSliderChange("priceMax", newValue);
                }}
                className="slider slider-max"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;

