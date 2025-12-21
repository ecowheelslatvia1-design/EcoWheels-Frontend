import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AddProduct from "../../components/Admin/AddProduct";
import ProductList from "../../components/Admin/ProductList";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleProductSuccess = () => {
    setShowAddProduct(false);
    setEditingProduct(null);
    setRefreshKey((prev) => prev + 1); // Trigger refresh
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowAddProduct(true);
  };

  const handleCancel = () => {
    setShowAddProduct(false);
    setEditingProduct(null);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-actions">
          <span className="admin-user">Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="admin-btn-secondary">
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-actions">
          <button
            onClick={() => {
              if (showAddProduct) {
                handleCancel();
              } else {
                setShowAddProduct(true);
                setEditingProduct(null);
              }
            }}
            className="admin-btn-primary"
          >
            {showAddProduct ? "Cancel" : "Add Product"}
          </button>
        </div>

        {showAddProduct && (
          <div className="admin-add-product-section">
            <AddProduct
              product={editingProduct}
              onSuccess={handleProductSuccess}
              onCancel={handleCancel}
            />
          </div>
        )}

        {!showAddProduct && (
          <ProductList
            key={refreshKey}
            onEdit={handleEdit}
            onRefresh={refreshKey}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


