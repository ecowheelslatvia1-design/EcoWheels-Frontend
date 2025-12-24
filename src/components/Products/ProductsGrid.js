import React from "react";
import ProductCard from "./ProductCard";
import "./ProductsGrid.css";

const ProductsGrid = ({ products, loading, total, totalPages, sortBy, onSortChange, currentPage, onPageChange }) => {

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
              {currentPage > 1 && (
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  className="pagination-btn pagination-btn-nav"
                  aria-label="Previous page"
                >
                  «
                </button>
              )}
              
              <div className="pagination-content">
                <div className="pagination-numbers">
                  {(() => {
                    const pages = [];
                    const maxVisible = 5;
                    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
                    
                    if (endPage - startPage < maxVisible - 1) {
                      startPage = Math.max(1, endPage - maxVisible + 1);
                    }
                    
                    if (startPage > 1) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => onPageChange(1)}
                          className="pagination-btn pagination-number"
                        >
                          1
                        </button>
                      );
                      if (startPage > 2) {
                        pages.push(
                          <span key="ellipsis-start" className="pagination-ellipsis">
                            ...
                          </span>
                        );
                      }
                    }
                    
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => onPageChange(i)}
                          className={`pagination-btn pagination-number ${
                            i === currentPage ? "active" : ""
                          }`}
                        >
                          {i}
                        </button>
                      );
                    }
                    
                    if (endPage < totalPages) {
                      if (endPage < totalPages - 1) {
                        pages.push(
                          <span key="ellipsis-end" className="pagination-ellipsis">
                            ...
                          </span>
                        );
                      }
                      pages.push(
                        <button
                          key={totalPages}
                          onClick={() => onPageChange(totalPages)}
                          className="pagination-btn pagination-number"
                        >
                          {totalPages}
                        </button>
                      );
                    }
                    
                    return pages;
                  })()}
                </div>
                
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              
              {currentPage < totalPages && (
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  className="pagination-btn pagination-btn-nav"
                  aria-label="Next page"
                >
                  »
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsGrid;

