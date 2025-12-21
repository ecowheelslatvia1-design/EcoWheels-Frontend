import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AddProduct from "../../components/Admin/AddProduct";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
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
            onClick={() => setShowAddProduct(!showAddProduct)}
            className="admin-btn-primary"
          >
            {showAddProduct ? "Cancel" : "Add Product"}
          </button>
        </div>

        {showAddProduct && (
          <div className="admin-add-product-section">
            <AddProduct onSuccess={() => setShowAddProduct(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


