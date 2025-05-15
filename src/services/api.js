// src/services/api.js
import axios from 'axios';

console.log("API Service initialization. API URL:", import.meta.env.VITE_API_URL);

// Create an axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(`API Request to ${config.url}. Token exists: ${!!token}`);
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API response error:', error.response?.status, error.message);
    
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      console.log('Authentication error. Clearing localStorage.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirect to login page
    }
    
    return Promise.reject(error);
  }
);

// Authentication API calls
export const login = async (credentials) => {
  console.log('Login API call with:', credentials.username);
  try {
    const response = await api.post('/auth/login', credentials);
    console.log('Login API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login API error:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Login failed. Please try again.' };
  }
};

export const register = async (userData) => {
  console.log('Register API call');
  try {
    const response = await api.post('/auth/register', userData);
    console.log('Register API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Register API error:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Registration failed. Please try again.' };
  }
};

// Products API calls
export const getProducts = async () => {
  console.log('Get products API call');
  try {
    const response = await api.get('/products');
    console.log('Get products API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get products API error:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to fetch products' };
  }
};

export const getProduct = async (id) => {
  console.log(`Get product API call for ID: ${id}`);
  try {
    const response = await api.get(`/products/${id}`);
    console.log('Get product API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get product API error:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to fetch product' };
  }
};

export const createProduct = async (productData) => {
  console.log('Create product API call:', productData);
  try {
    const response = await api.post('/products', productData);
    console.log('Create product API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create product API error:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to create product' };
  }
};

export const updateProduct = async (id, productData) => {
  console.log(`Update product API call for ID: ${id}`, productData);
  try {
    const response = await api.put(`/products/${id}`, productData);
    console.log('Update product API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update product API error:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to update product' };
  }
};

export const deleteProduct = async (id) => {
  console.log(`Delete product API call for ID: ${id}`);
  try {
    const response = await api.delete(`/products/${id}`);
    console.log('Delete product API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Delete product API error:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to delete product' };
  }
};

export const getImages = async () => {
  console.log('Get images API call');
  try {
    const response = await api.get('/products/images/all');
    console.log('Get images API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get images API error:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to fetch images' };
  }
};

export default api;