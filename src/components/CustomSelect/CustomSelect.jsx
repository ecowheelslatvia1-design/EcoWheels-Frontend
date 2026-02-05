import { useState, useRef, useEffect } from "react";
import "./CustomSelect.css";

const CustomSelect = ({ 
  id, 
  name, 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option",
  required = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLabel = value || placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({
      target: {
        name,
        value: option,
      },
    });
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="custom-select-container" ref={containerRef}>
      <button
        type="button"
        id={id}
        className={`custom-select-button ${isOpen ? "open" : ""} ${value ? "has-value" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        required={required}
        aria-required={required}
      >
        <span className="custom-select-value">{selectedLabel}</span>
        <svg
          className="custom-select-arrow"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="custom-select-dropdown">
          <input
            type="text"
            className="custom-select-search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <ul className="custom-select-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className={`custom-select-option ${
                    value === option ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="custom-select-no-options">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
