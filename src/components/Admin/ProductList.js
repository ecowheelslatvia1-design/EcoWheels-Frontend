import React, { useState, useEffect, useRef } from "react";
import { productAPI, adminAPI } from "../../services/api";
import { formatPrice } from "../../utils/currencyFormatter";
import "./ProductList.css";

const ProductList = ({ onEdit, onRefresh }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(6);
  const searchTimeoutRef = useRef(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: limit,
      };
      
      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }
      
      const response = await productAPI.getProducts(params);
      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 1);
      setTotal(response.data.total || 0);
      setError("");
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchProducts();
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // Fetch products on page change or refresh
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRefresh, currentPage]);

  const handleDelete = async (productId) => {
    try {
      await adminAPI.deleteProduct(productId);
      setProducts(products.filter((p) => p._id !== productId));
      setDeleteConfirm(null);
      if (products.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchProducts();
      }
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && products.length === 0) {
    return <div className="product-list-loading">Loading products...</div>;
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2 className="product-list-title">
          Products {total > 0 && `(${total})`}
        </h2>
        <div className="product-list-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className="search-clear"
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <div className="product-list-error">{error}</div>}

      {loading && products.length > 0 && (
        <div className="product-list-loading-overlay">Loading...</div>
      )}

      {products.length === 0 ? (
        <div className="product-list-empty">
          <p>
            {searchTerm
              ? `No products found matching "${searchTerm}"`
              : "No products found. Add your first product!"}
          </p>
        </div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Listed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="product-image"
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </td>
                    <td className="product-name">{product.name}</td>
                    <td>{product.category}</td>
                    <td>{formatPrice(product.price?.current, product.price?.currency)}</td>
                    <td>{product.quantity || 0}</td>
                    <td>
                      <span
                        className={
                          product.quantity > 0 ? "in-stock" : "out-of-stock"
                        }
                      >
                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={product.isListed ? "listed" : "unlisted"}
                      >
                        {product.isListed ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => onEdit(product)}
                          className="btn-edit"
                        >
                          Edit
                        </button>
                        {deleteConfirm === product._id ? (
                          <div className="delete-confirm">
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="btn-confirm"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="btn-cancel"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(product._id)}
                            className="btn-delete"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              <div className="pagination-info">
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <span className="pagination-total">
                  ({total} {total === 1 ? "product" : "products"})
                </span>
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
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

export default ProductList;
