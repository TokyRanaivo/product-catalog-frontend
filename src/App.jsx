// src/App.jsx - Main application component with routing
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';
import './debug';


/**
 * Main application component
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Home route redirects to products */}
          <Route path="/" element={
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          } />
          
          {/* Authentication routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Catch-all redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;