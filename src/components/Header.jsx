// src/components/Header.jsx - Updated to remove the Product Catalog title
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../contexts/AuthContext';

// Styled components
const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #e1e1e1;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  a {
    text-decoration: none;
    color: #007bff;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0069d9;
  }
`;

const WelcomeText = styled.span`
  margin-right: 15px;
  font-weight: 500;
`;

/**
 * Header component with navigation and authentication controls
 * Updated to remove the Product Catalog title
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
    <HeaderContainer>
      <NavLinks>
        {isAuthenticated() ? (
          <>
            <WelcomeText>Welcome, {user.name}!</WelcomeText>
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
    </HeaderContainer>
  );
};

export default Header;