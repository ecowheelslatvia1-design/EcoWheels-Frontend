import React, { useState, useEffect } from "react";
import { accessoryAPI } from "../../services/api";
import AccessoriesFilterSidebar from "../../components/Accessories/AccessoriesFilterSidebar";
import ProductsGrid from "../../components/Products/ProductsGrid";
import "./Accessories.css";

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: [],
    subCategory: [],
    compatibility: [],
    priceMin: 0,
    priceMax: 5000,
    inStock: [],
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    calculateActiveFilters();
  }, [filters]);

  const calculateActiveFilters = () => {
    let count = 0;
    if (filters.category.length > 0) count++;
    if (filters.subCategory.length > 0) count++;
    if (filters.compatibility.length > 0) count++;
    if (filters.priceMin !== 0 || filters.priceMax !== 5000) count++;
    if (filters.inStock.length > 0) count++;
    setActiveFiltersCount(count);
  };

  useEffect(() => {
    fetchAccessories();
  }, [filters, currentPage, sortBy]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const fetchAccessories = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 6,
        sort: sortBy,
      };

      if (filters.category.length > 0) {
        params.category = filters.category;
      }
      if (filters.subCategory.length > 0) {
        params.subCategory = filters.subCategory;
      }
      if (filters.compatibility.length > 0) {
        params.compatibility = filters.compatibility;
      }
      if (filters.priceMin !== 0) params.priceMin = filters.priceMin;
      if (filters.priceMax !== 5000) params.priceMax = filters.priceMax;
      if (filters.inStock.length === 1) {
        params.inStock = filters.inStock[0];
      }

      const response = await accessoryAPI.getAccessories(params);
      setAccessories(response.data.accessories || []);
      setTotal(response.data.total || 0);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching accessories:", error);
      setAccessories([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (filterType === "subCategory" || filterType === "compatibility") {
        const currentValues = newFilters[filterType] || [];
        if (currentValues.includes(value)) {
          newFilters[filterType] = currentValues.filter((v) => v !== value);
        } else {
          newFilters[filterType] = [...currentValues, value];
        }
      } else if (filterType === "priceMin" || filterType === "priceMax") {
        newFilters[filterType] = value;
      } else if (filterType === "inStock") {
        const currentValues = newFilters.inStock || [];
        if (currentValues.includes(value)) {
          newFilters.inStock = currentValues.filter((v) => v !== value);
        } else {
          newFilters.inStock = [...currentValues, value];
        }
      }

      setCurrentPage(1);
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      subCategory: [],
      compatibility: [],
      priceMin: 0,
      priceMax: 5000,
      inStock: [],
    });
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Convert accessories to products format for ProductsGrid component
  const productsForGrid = accessories.map((accessory) => ({
    _id: accessory._id,
    name: accessory.name,
    description: accessory.description,
    images: accessory.images,
    price: accessory.price,
    inStock: accessory.stockStatus?.inStock || false,
    reviews: accessory.reviews,
    tagline: accessory.description,
    url: `/accessories/${accessory._id}`,
  }));

  return (
    <div className="products-page-container">
      <div className="products-layout">
        <div
          className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />
        <AccessoriesFilterSidebar
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Filters
            {activeFiltersCount > 0 && (
              <span className="filter-badge">{activeFiltersCount}</span>
            )}
          </button>
          <ProductsGrid
            products={productsForGrid}
            loading={loading}
            total={total}
            totalPages={totalPages}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Accessories;

