// src/components/Header.jsx - Header component with improved responsive design
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeader, PageTitle, NavLinks, Button } from '../styles/StyledComponents';
import AuthContext from '../contexts/AuthContext';

/**
 * Header component with navigation and authentication controls
 */
const Header = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Handle logout button click
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <PageHeader>
      <PageTitle>Product Catalog</PageTitle>
      <NavLinks>
        {isAuthenticated() ? (
          <>
            <span>Welcome, {user.name}!</span>
            <Link to="/">Products</Link>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </NavLinks>
    </PageHeader>
  );
};

export default Header;