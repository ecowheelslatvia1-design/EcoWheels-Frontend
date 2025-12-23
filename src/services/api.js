import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export const productAPI = {
  getProducts: (params) => api.get("/products", { params }),
  getProductById: (id) => api.get(`/products/${id}`),
};

// User API
export const userAPI = {
  register: (data) => api.post("/users/register", data),
  login: (data) => api.post("/users/login", data),
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) => api.put("/users/profile", data),
};

// Cart API
export const cartAPI = {
  getCart: () => api.get("/cart"),
  addToCart: (data) => api.post("/cart", data),
  updateCartItem: (itemId, quantity) =>
    api.put(`/cart/${itemId}`, { quantity }),
  removeFromCart: (itemId) => api.delete(`/cart/${itemId}`),
  clearCart: () => api.delete("/cart"),
};

// Admin API
export const adminAPI = {
  createProduct: (formData) => {
    // Use a separate axios instance for FormData to avoid JSON headers
    const formApi = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    // Add token to request
    const token = localStorage.getItem("token");
    if (token) {
      formApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    
    return formApi.post("/products", formData);
  },
  updateProduct: (id, formData) => {
    // Use a separate axios instance for FormData to avoid JSON headers
    const formApi = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    // Add token to request
    const token = localStorage.getItem("token");
    if (token) {
      formApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    
    return formApi.put(`/products/${id}`, formData);
  },
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

export default api;
