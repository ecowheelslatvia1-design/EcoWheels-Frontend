import React, { useState, useEffect } from "react";
import { productAPI } from "../../services/api";
import FilterSidebar from "../../components/Products/FilterSidebar";
import ProductsGrid from "../../components/Products/ProductsGrid";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    category: "",
    drivetrain: [],
    electricAssistRange: [],
    payload: [],
    riderHeight: [],
    suspension: [],
    colors: [],
    priceMin: 499,
    priceMax: 1799,
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    calculateActiveFilters();
  }, [filters]);

  const calculateActiveFilters = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.drivetrain.length > 0) count++;
    if (filters.electricAssistRange.length > 0) count++;
    if (filters.payload.length > 0) count++;
    if (filters.riderHeight.length > 0) count++;
    if (filters.suspension.length > 0) count++;
    if (filters.colors.length > 0) count++;
    if (filters.priceMin !== 499 || filters.priceMax !== 1799) count++;
    setActiveFiltersCount(count);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 12,
        sort: sortBy,
      };

      if (filters.category) params.category = filters.category;
      if (filters.drivetrain.length > 0) params.drivetrain = filters.drivetrain[0];
      if (filters.electricAssistRange.length > 0) params.electricAssistRange = filters.electricAssistRange[0];
      if (filters.payload.length > 0) {
        // Get the highest payload value selected
        const payloadValues = filters.payload.map(p => parseInt(p.replace('lbs', '')));
        params.payload = Math.max(...payloadValues);
      }
      if (filters.riderHeight.length > 0) params.riderHeight = filters.riderHeight;
      if (filters.suspension.length > 0) params.suspension = filters.suspension[0];
      if (filters.colors.length > 0) params.colors = filters.colors;
      if (filters.priceMin !== 499) params.priceMin = filters.priceMin;
      if (filters.priceMax !== 1799) params.priceMax = filters.priceMax;

      const response = await productAPI.getProducts(params);
      setProducts(response.data.products || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      
      if (filterType === "category") {
        newFilters.category = value;
      } else if (Array.isArray(newFilters[filterType])) {
        const currentValues = newFilters[filterType];
        if (currentValues.includes(value)) {
          newFilters[filterType] = currentValues.filter((v) => v !== value);
        } else {
          newFilters[filterType] = [...currentValues, value];
        }
      } else if (filterType === "priceMin" || filterType === "priceMax") {
        newFilters[filterType] = value;
      }
      
      setCurrentPage(1); // Reset to first page on filter change
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      drivetrain: [],
      electricAssistRange: [],
      payload: [],
      riderHeight: [],
      suspension: [],
      colors: [],
      priceMin: 499,
      priceMax: 1799,
    });
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };
  if(products.length === 0) {
    return <div className="products-page-container">
      <div className="products-layout">
        <div className="products-main-content">
          <div className="no-products-message">We are updating our products, please check back later.</div>
        </div>
      </div>
    </div>
  }

  return (
    <div className="products-page-container">
      <div className="products-layout">
        <div 
          className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          activeFiltersCount={activeFiltersCount}
          onClearFilters={clearFilters}
          total={total}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="products-main-content">
          <button 
            className="filter-toggle-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Filters
            {activeFiltersCount > 0 && (
              <span className="filter-badge">{activeFiltersCount}</span>
            )}
          </button>
          <ProductsGrid
            products={products}
            loading={loading}
            total={total}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;

