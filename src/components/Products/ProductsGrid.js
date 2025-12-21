import React from "react";
import ProductCard from "./ProductCard";
import "./ProductsGrid.css";

const ProductsGrid = ({ products, loading, total, sortBy, onSortChange, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / 12);

  if (loading && products.length === 0) {
    return (
      <div className="products-grid-container">
        <div className="products-grid-header">
          <div className="sort-container">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="priceLow">Price (Low to high)</option>
              <option value="priceHigh">Price (High to low)</option>
            </select>
          </div>
        </div>
        <div className="loading-message">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="products-grid-container">
      <div className="products-grid-header">
        <div className="sort-container">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="priceLow">Price (Low to high)</option>
            <option value="priceHigh">Price (High to low)</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="no-products-message">
          <p>No products found matching your filters.</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsGrid;

