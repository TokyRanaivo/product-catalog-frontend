// src/debug.js - Development debugging helpers
const DEBUG = true;

export const clearAuth = () => {
  if (DEBUG) {
    console.log("Clearing authentication data");
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log("Auth data cleared");
  }
};

export const showStorage = () => {
  if (DEBUG) {
    console.log("Current localStorage:");
    console.log("user:", localStorage.getItem('user'));
    console.log("token exists:", !!localStorage.getItem('token'));
  }
};

// Run debug functions on load in development
if (DEBUG && import.meta.env.DEV) {
  console.log("Debug mode active");
  showStorage();
}