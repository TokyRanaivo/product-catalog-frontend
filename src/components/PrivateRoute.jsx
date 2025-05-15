// src/components/PrivateRoute.jsx
import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { LoadingContainer, Spinner } from '../styles/StyledComponents';

/**
 * Component for protecting routes that require authentication
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components to render if authenticated
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  console.log('PrivateRoute rendering:', { isAuthenticated: isAuthenticated(), loading, user });
  
  useEffect(() => {
    // Double-check authentication on component mount
    if (!loading && !isAuthenticated()) {
      console.log('PrivateRoute: Not authenticated, redirecting to login');
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);
  
  // If still loading auth state, show loading indicator
  if (loading) {
    return (
      <LoadingContainer>
        <Spinner size="40px" />
        <p>Loading...</p>
      </LoadingContainer>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    console.log('PrivateRoute: Not authenticated, rendering Navigate component');
    return <Navigate to="/login" />;
  }
  
  // If authenticated, render children
  console.log('PrivateRoute: Authenticated, rendering children');
  return children;
};

export default PrivateRoute;