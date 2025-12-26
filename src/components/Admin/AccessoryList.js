import React, { useState, useEffect, useRef } from "react";
import { accessoryAPI, adminAPI } from "../../services/api";
import { formatPrice } from "../../utils/currencyFormatter";
import "./ProductList.css";

const AccessoryList = ({ onEdit, onRefresh }) => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(6);
  const searchTimeoutRef = useRef(null);

  const fetchAccessories = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: limit,
      };

      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      const response = await accessoryAPI.getAccessories(params);
      setAccessories(response.data.accessories || []);
      setTotalPages(response.data.totalPages || 1);
      setTotal(response.data.total || 0);
      setError("");
    } catch (err) {
      setError("Failed to load accessories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchAccessories();
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchAccessories();
  }, [onRefresh, currentPage]);

  const handleDelete = async (accessoryId) => {
    try {
      await adminAPI.deleteAccessory(accessoryId);
      setAccessories(accessories.filter((a) => a._id !== accessoryId));
      setDeleteConfirm(null);
      if (accessories.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchAccessories();
      }
    } catch (err) {
      setError("Failed to delete accessory");
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

  const toggleListStatus = async (accessoryId, currentStatus) => {
    try {
      const accessory = accessories.find((a) => a._id === accessoryId);
      if (!accessory) return;

      const formData = new FormData();
      formData.append("isListed", !currentStatus);

      await adminAPI.updateAccessory(accessoryId, formData);
      fetchAccessories();
    } catch (err) {
      setError("Failed to update accessory status");
      console.error(err);
    }
  };

  if (loading && accessories.length === 0) {
    return <div className="product-list-loading">Loading accessories...</div>;
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2 className="product-list-title">
          Accessories {total > 0 && `(${total})`}
        </h2>
        <div className="product-list-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search accessories by name..."
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

      {loading && accessories.length > 0 && (
        <div className="product-list-loading-overlay">Loading...</div>
      )}

      {accessories.length === 0 ? (
        <div className="product-list-empty">
          <p>
            {searchTerm
              ? `No accessories found matching "${searchTerm}"`
              : "No accessories found. Add your first accessory!"}
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
                  <th>Sub Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Listed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accessories.map((accessory) => (
                  <tr key={accessory._id}>
                    <td>
                      {accessory.images && accessory.images.length > 0 ? (
                        <img
                          src={accessory.images[0]}
                          alt={accessory.name}
                          className="product-image"
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </td>
                    <td className="product-name">{accessory.name}</td>
                    <td>{accessory.category}</td>
                    <td>{accessory.subCategory || "-"}</td>
                    <td>
                      {formatPrice(
                        accessory.price?.current,
                        accessory.price?.currency
                      )}
                    </td>
                    <td>{accessory.stockStatus?.quantity || 0}</td>
                    <td>
                      <span
                        className={
                          accessory.stockStatus?.quantity > 0
                            ? "in-stock"
                            : "out-of-stock"
                        }
                      >
                        {accessory.stockStatus?.quantity > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={accessory.isListed ? "listed" : "unlisted"}
                      >
                        {accessory.isListed ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => onEdit(accessory)}
                          className="btn-edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            toggleListStatus(accessory._id, accessory.isListed)
                          }
                          className={
                            accessory.isListed ? "btn-unlist" : "btn-list"
                          }
                        >
                          {accessory.isListed ? "Unlist" : "List"}
                        </button>
                        {deleteConfirm === accessory._id ? (
                          <div className="delete-confirm">
                            <button
                              onClick={() => handleDelete(accessory._id)}
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
                            onClick={() => setDeleteConfirm(accessory._id)}
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
                  ({total} {total === 1 ? "accessory" : "accessories"})
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

export default AccessoryList;

