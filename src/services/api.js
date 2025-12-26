import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
// const API_URL = "https://localhost:5000/api";

// Global loading state management
let loadingCount = 0;
let loadingCallbacks = [];

export const setLoadingCallbacks = (callbacks) => {
  loadingCallbacks = callbacks;
};

const updateLoading = (increment, message = "Loading...") => {
  loadingCount += increment;
  const isLoading = loadingCount > 0;
  
  loadingCallbacks.forEach((callback) => {
    if (callback) {
      if (isLoading) {
        callback.showLoading(message);
      } else {
        callback.hideLoading();
      }
    }
  });
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests and show loading
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Show loading for API calls
    updateLoading(1, "Loading...");
    
    return config;
  },
  (error) => {
    updateLoading(-1);
    return Promise.reject(error);
  }
);

// Hide loading on response
api.interceptors.response.use(
  (response) => {
    updateLoading(-1);
    return response;
  },
  (error) => {
    updateLoading(-1);
    return Promise.reject(error);
  }
);



export const productAPI = {
  getProducts: (params) => api.get("/products", { params }),
  getProductById: (id) => api.get(`/products/${id}`),
};

// Accessories API
export const accessoryAPI = {
  getAccessories: (params) => api.get("/accessories", { params }),
  getAccessoryById: (id) => api.get(`/accessories/${id}`),
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

// Helper function to create FormData axios instance with loading
const createFormApi = () => {
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

  // Add loading interceptors
  formApi.interceptors.request.use(
    (config) => {
      updateLoading(1, "Loading...");
      return config;
    },
    (error) => {
      updateLoading(-1);
      return Promise.reject(error);
    }
  );

  formApi.interceptors.response.use(
    (response) => {
      updateLoading(-1);
      return response;
    },
    (error) => {
      updateLoading(-1);
      return Promise.reject(error);
    }
  );

  return formApi;
};

// Admin API
export const adminAPI = {
  createProduct: (formData) => {
    const formApi = createFormApi();
    return formApi.post("/products", formData);
  },
  updateProduct: (id, formData) => {
    const formApi = createFormApi();
    return formApi.put(`/products/${id}`, formData);
  },
  deleteProduct: (id) => api.delete(`/products/${id}`),
  // Accessories Admin API
  createAccessory: (formData) => {
    const formApi = createFormApi();
    return formApi.post("/accessories", formData);
  },
  updateAccessory: (id, formData) => {
    const formApi = createFormApi();
    return formApi.put(`/accessories/${id}`, formData);
  },
  deleteAccessory: (id) => api.delete(`/accessories/${id}`),
};

export default api;
