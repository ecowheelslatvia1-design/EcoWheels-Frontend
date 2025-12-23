import React, { useState } from "react";
import "./FilterSidebar.css";

const FilterSidebar = ({ filters, onFilterChange, activeFiltersCount, onClearFilters, total, isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    availability: true,
    ridingStyles: true,
    frameType: true,
    poster: true,
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

  return (
    <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="filter-header">
        <div className="filter-header-top">
          <h3 className="filter-title">Filters</h3>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close filters">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="filter-header-info">
          <span className="results-count">{total} {total === 1 ? 'result' : 'results'}</span>
          {activeFiltersCount > 0 && (
            <button className="clear-filters-btn" onClick={onClearFilters}>
              Clear All ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>

      {/* Availability */}
      <div className="filter-section">
        <button 
          className="filter-section-header" 
          onClick={() => toggleSection("availability")}
          aria-expanded={expandedSections.availability}
        >
          <span className="filter-section-title">Availability</span>
          <span className={`filter-arrow ${expandedSections.availability ? "expanded" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        {expandedSections.availability && (
          <div className="filter-options availability-options">
            <label className="filter-checkbox availability-checkbox">
              <input
                type="checkbox"
                checked={filters.inStock.includes(true)}
                onChange={() => handleCheckboxChange("inStock", true)}
              />
              <span>In Stock</span>
            </label>
            <label className="filter-checkbox availability-checkbox">
              <input
                type="checkbox"
                checked={filters.inStock.includes(false)}
                onChange={() => handleCheckboxChange("inStock", false)}
              />
              <span>Pre-order</span>
            </label>
          </div>
        )}
      </div>

      {/* Riding Styles */}
      <div className="filter-section">
        <button 
          className="filter-section-header" 
          onClick={() => toggleSection("ridingStyles")}
          aria-expanded={expandedSections.ridingStyles}
        >
          <span className="filter-section-title">Riding Styles</span>
          <span className={`filter-arrow ${expandedSections.ridingStyles ? "expanded" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        {expandedSections.ridingStyles && (
          <div className="filter-options">
            {[
              "Urban Commuting",
              "Off-road / Mountain Riding",
              "Long-distance Touring",
              "Leisure Riding / Daily Errands",
              "Cargo & Delivery Use"
            ].map((ridingStyle) => (
              <label key={ridingStyle} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.ridingStyles.includes(ridingStyle)}
                  onChange={() => handleCheckboxChange("ridingStyles", ridingStyle)}
                />
                <span>{ridingStyle}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Frame Types */}
      <div className="filter-section">
        <button 
          className="filter-section-header" 
          onClick={() => toggleSection("frameType")}
          aria-expanded={expandedSections.frameType}
        >
          <span className="filter-section-title">Frame Types</span>
          <span className={`filter-arrow ${expandedSections.frameType ? "expanded" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        {expandedSections.frameType && (
          <div className="frame-type-buttons">
            {[
              { value: "Foldable", icon: "/images/icon-frame-types-foldable.png", label: "Foldable" },
              { value: "Low step", icon: "/images/icon-frame-types-low-step.png", label: "Low-Step" },
              { value: "Mid step", icon: "/images/icon-frame-types-mid-step.png", label: "Mid-Step" },
              { value: "High step", icon: "/images/icon-frame-types-high-step.png", label: "High-Step" }
            ].map((frameType) => (
              <button
                key={frameType.value}
                className={`frame-type-btn ${filters.frameType.includes(frameType.value) ? "active" : ""}`}
                onClick={() => handleCheckboxChange("frameType", frameType.value)}
              >
                <img src={frameType.icon} alt={frameType.label} className="frame-type-icon" />
                <span>{frameType.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Riding Posture */}
      <div className="filter-section">
        <button 
          className="filter-section-header" 
          onClick={() => toggleSection("poster")}
          aria-expanded={expandedSections.poster}
        >
          <span className="filter-section-title">Riding Posture</span>
          <span className={`filter-arrow ${expandedSections.poster ? "expanded" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        {expandedSections.poster && (
          <div className="riding-posture-buttons">
            {[
              { value: "Upright", icon: "/images/icon-riding-posture-upright.png", label: "Upright" },
              { value: "Active", icon: "/images/icon-riding-posture-active.png", label: "Active" },
              { value: "Sporty", icon: "/images/icon-riding-posture-sporty.png", label: "Sporty" }
            ].map((posture) => (
              <button
                key={posture.value}
                className={`riding-posture-btn ${filters.poster.includes(posture.value) ? "active" : ""}`}
                onClick={() => handleCheckboxChange("poster", posture.value)}
              >
                <img src={posture.icon} alt={posture.label} className="riding-posture-icon" />
                <span>{posture.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Drivetrain */}
      <div className="filter-section">
        <button 
          className="filter-section-header" 
          onClick={() => toggleSection("drivetrain")}
          aria-expanded={expandedSections.drivetrain}
        >
          <span className="filter-section-title">Drivetrain</span>
          <span className={`filter-arrow ${expandedSections.drivetrain ? "expanded" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
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
        <button 
          className="filter-section-header" 
          onClick={() => toggleSection("electricAssistRange")}
          aria-expanded={expandedSections.electricAssistRange}
        >
          <span className="filter-section-title">Electric Assist Range</span>
          <span className={`filter-arrow ${expandedSections.electricAssistRange ? "expanded" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
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
        <button 
          className="filter-section-header" 
          onClick={() => toggleSection("payload")}
          aria-expanded={expandedSections.payload}
        >
          <span className="filter-section-title">Payload</span>
          <span className={`filter-arrow ${expandedSections.payload ? "expanded" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
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
        <button 
          className="filter-section-header" 
          onClick={() => toggleSection("riderHeight")}
          aria-expanded={expandedSections.riderHeight}
        >
          <span className="filter-section-title">Rider Height</span>
          <span className={`filter-arrow ${expandedSections.riderHeight ? "expanded" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        {expandedSections.riderHeight && (
          <div className="filter-options">
            {[
              "150cm (4'11\") - 185cm (6'1\")",
              "155cm (5'1\") - 185cm (6'1\")",
              "160cm (5'3\") - 190cm (6'3\")",
              "165cm (5'5\") - 195cm (6'5\")",
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
        <button 
          className="filter-section-header" 
          onClick={() => toggleSection("suspension")}
          aria-expanded={expandedSections.suspension}
        >
          <span className="filter-section-title">Suspension</span>
          <span className={`filter-arrow ${expandedSections.suspension ? "expanded" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
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
        <button 
          className="filter-section-header" 
          onClick={() => toggleSection("colors")}
          aria-expanded={expandedSections.colors}
        >
          <span className="filter-section-title">Colors</span>
          <span className={`filter-arrow ${expandedSections.colors ? "expanded" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
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

      {/* Price */}
      <div className="filter-section">
        <button 
          className="filter-section-header" 
          onClick={() => toggleSection("price")}
          aria-expanded={expandedSections.price}
        >
          <span className="filter-section-title">Price</span>
          <span className={`filter-arrow ${expandedSections.price ? "expanded" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        {expandedSections.price && (
          <div className="price-input-container">
            <div className="price-input-group">
              <label className="price-input-label">Min</label>
              <div className="price-input-wrapper">
                <span className="price-currency">$</span>
                <input
                  type="number"
                  min="0"
                  value={filters.priceMin}
                  onChange={(e) => handlePriceInputChange("priceMin", e.target.value)}
                  className="price-input"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="price-input-separator">-</div>
            <div className="price-input-group">
              <label className="price-input-label">Max</label>
              <div className="price-input-wrapper">
                <span className="price-currency">$</span>
                <input
                  type="number"
                  min={filters.priceMin + 1}
                  value={filters.priceMax}
                  onChange={(e) => handlePriceInputChange("priceMax", e.target.value)}
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

export default FilterSidebar;

