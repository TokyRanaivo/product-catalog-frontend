// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    try {
      console.log("AuthContext initializing...");
      const storedUser = localStorage.getItem('user');
      console.log("Stored user data:", storedUser);
      const storedToken = localStorage.getItem('token');
      console.log("Token exists:", !!storedToken);
      
      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("Parsed user data:", parsedUser);
          setUser(parsedUser);
        } catch (parseError) {
          console.error('Error parsing stored user data:', parseError);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setError('Invalid user data. Please login again.');
        }
      } else if (!storedToken && storedUser) {
        // Clean up inconsistent state
        console.log("Found user data but no token, clearing localStorage");
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error initializing auth context:', error);
      setError('Authentication error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = (userData, token) => {
    console.log("Login called with data:", { userData, tokenExists: !!token });
    
    if (!userData || !token) {
      console.error("Login called with invalid data");
      setError('Invalid login data');
      return;
    }
    
    try {
      // Save user and token to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      setUser(userData);
      setError(null);
      console.log("User logged in successfully:", userData);
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please try again.');
    }
  };

  // Logout function
  const logout = () => {
    console.log("Logout called");
    try {
      // Clear user data and token from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setError(null);
      console.log("User logged out successfully");
    } catch (error) {
      console.error('Error during logout:', error);
      setError('Logout failed. Please try again.');
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    const result = !!user && !!localStorage.getItem('token');
    console.log("isAuthenticated check:", { user, result });
    return result;
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated
  };

  console.log("AuthContext rendering with:", { user, loading, error });
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;