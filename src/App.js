import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { setLoadingCallbacks } from "./services/api";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import GlobalLoader from "./components/Loading/GlobalLoader";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Accessories from "./pages/Accessories/Accessories";
import CartPage from "./pages/CartPage/CartPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import Reviews from "./pages/Reviews/Reviews";
import Blog from "./pages/Blog/Blog";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Admin/AdminRoute";
import "./App.css";

// Component to connect API loading to context
const AppContent = () => {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingCallbacks([{ showLoading, hideLoading }]);
  }, [showLoading, hideLoading]);

  return (
    <>
      <GlobalLoader />
      <Routes>
        {/* Admin routes without Header/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        {/* Public routes with Header/Footer */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/accessories" element={<Accessories />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/blog" element={<Blog />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <div className="App">
              <AppContent />
            </div>
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;
