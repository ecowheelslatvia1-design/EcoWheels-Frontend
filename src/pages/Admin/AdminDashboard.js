import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AddProduct from "../../components/Admin/AddProduct";
import ProductList from "../../components/Admin/ProductList";
import AddAccessory from "../../components/Admin/AddAccessory";
import AccessoryList from "../../components/Admin/AccessoryList";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products"); // "products" or "accessories"
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddAccessory, setShowAddAccessory] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingAccessory, setEditingAccessory] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleProductSuccess = () => {
    setShowAddProduct(false);
    setEditingProduct(null);
    setRefreshKey((prev) => prev + 1);
  };

  const handleAccessorySuccess = () => {
    setShowAddAccessory(false);
    setEditingAccessory(null);
    setRefreshKey((prev) => prev + 1);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowAddProduct(true);
  };

  const handleEditAccessory = (accessory) => {
    setEditingAccessory(accessory);
    setShowAddAccessory(true);
  };

  const handleCancelProduct = () => {
    setShowAddProduct(false);
    setEditingProduct(null);
  };

  const handleCancelAccessory = () => {
    setShowAddAccessory(false);
    setEditingAccessory(null);
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
        <div className="admin-tabs">
          <button
            className={activeTab === "products" ? "active" : ""}
            onClick={() => {
              setActiveTab("products");
              setShowAddProduct(false);
              setShowAddAccessory(false);
              setEditingProduct(null);
              setEditingAccessory(null);
            }}
          >
            Products
          </button>
          <button
            className={activeTab === "accessories" ? "active" : ""}
            onClick={() => {
              setActiveTab("accessories");
              setShowAddProduct(false);
              setShowAddAccessory(false);
              setEditingProduct(null);
              setEditingAccessory(null);
            }}
          >
            Accessories
          </button>
        </div>

        <div className="admin-actions">
          {activeTab === "products" && (
            <button
              onClick={() => {
                if (showAddProduct) {
                  handleCancelProduct();
                } else {
                  setShowAddProduct(true);
                  setEditingProduct(null);
                }
              }}
              className="admin-btn-primary"
            >
              {showAddProduct ? "Cancel" : "Add Product"}
            </button>
          )}
          {activeTab === "accessories" && (
            <button
              onClick={() => {
                if (showAddAccessory) {
                  handleCancelAccessory();
                } else {
                  setShowAddAccessory(true);
                  setEditingAccessory(null);
                }
              }}
              className="admin-btn-primary"
            >
              {showAddAccessory ? "Cancel" : "Add Accessory"}
            </button>
          )}
        </div>

        {activeTab === "products" && (
          <>
            {showAddProduct && (
              <div className="admin-add-product-section">
                <AddProduct
                  product={editingProduct}
                  onSuccess={handleProductSuccess}
                  onCancel={handleCancelProduct}
                />
              </div>
            )}

            {!showAddProduct && (
              <ProductList
                key={refreshKey}
                onEdit={handleEditProduct}
                onRefresh={refreshKey}
              />
            )}
          </>
        )}

        {activeTab === "accessories" && (
          <>
            {showAddAccessory && (
              <div className="admin-add-product-section">
                <AddAccessory
                  accessory={editingAccessory}
                  onSuccess={handleAccessorySuccess}
                  onCancel={handleCancelAccessory}
                />
              </div>
            )}

            {!showAddAccessory && (
              <AccessoryList
                key={refreshKey}
                onEdit={handleEditAccessory}
                onRefresh={refreshKey}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


