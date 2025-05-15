// src/styles/StyledComponents.js - Updated styles for better responsiveness
import styled from 'styled-components';

// Container for centering content
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (min-width: 768px) {
    padding: 0 40px;
  }
`;

// Page header
export const PageHeader = styled.header`
  background-color: #f8f9fa;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #e1e1e1;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

// Navigation links
export const NavLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  @media (min-width: 768px) {
    margin-top: 0;
  }

  a {
    text-decoration: none;
    color: #007bff;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;


// Form container
export const FormContainer = styled.div`
  width: 100%;
  margin: 0 auto 30px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    max-width: 80%;
  }
  
  @media (min-width: 992px) {
    max-width: 70%;
  }
`;

// Form title
export const FormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.3rem;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Form group
export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

// Form label
export const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
`;

// Form input
export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.error ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

// Form textarea
export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.error ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

// Error message
export const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
`;

// Button
export const Button = styled.button`
  background-color: ${props => props.secondary ? '#6c757d' : '#007bff'};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: ${props => props.marginRight ? '10px' : '0'};
  
  &:hover {
    background-color: ${props => props.secondary ? '#5a6268' : '#0069d9'};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// Danger button
export const DangerButton = styled(Button)`
  background-color: #dc3545;
  
  &:hover {
    background-color: #c82333;
  }
`;

// Product grid
export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// Product card
export const ProductCard = styled.div`
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

// Product image container
export const ProductImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  
  @media (min-width: 768px) {
    height: 250px;
  }
`;

// Product image
export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

// Product content
export const ProductContent = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

// Product title
export const ProductTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

// Product price
export const ProductPrice = styled.p`
  font-weight: 600;
  color: #007bff;
  font-size: 1.1rem;
  margin: 0 0 10px 0;
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

// Product description
export const ProductDescription = styled.p`
  color: #666;
  margin: 0 0 15px 0;
  font-size: 0.9rem;
  flex-grow: 1;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

// Product actions
export const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

// Icon button
export const IconButton = styled.button`
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  color: ${props => props.color || '#007bff'};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, transform 0.2s ease;
  
  &:hover {
    color: ${props => {
      if (props.color === '#dc3545') return '#c82333';
      if (props.color === '#6c757d') return '#5a6268';
      return '#0069d9';
    }};
    transform: scale(1.1);
  }
`;

// Alert
export const Alert = styled.div`
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  background-color: ${props => {
    if (props.type === 'success') return '#d4edda';
    if (props.type === 'danger') return '#f8d7da';
    if (props.type === 'warning') return '#fff3cd';
    return '#cce5ff';  // default is info
  }};
  color: ${props => {
    if (props.type === 'success') return '#155724';
    if (props.type === 'danger') return '#721c24';
    if (props.type === 'warning') return '#856404';
    return '#004085';  // default is info
  }};
  border: 1px solid ${props => {
    if (props.type === 'success') return '#c3e6cb';
    if (props.type === 'danger') return '#f5c6cb';
    if (props.type === 'warning') return '#ffeeba';
    return '#b8daff';  // default is info
  }};
`;

// Preview image
export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  display: block;
  margin: 10px 0;
  border: 1px solid #ced4da;
  border-radius: 4px;
  
  @media (min-width: 768px) {
    max-height: 300px;
  }
`;

// Action button container
export const ActionButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

// Page title
export const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;


// Loading spinner
export const Spinner = styled.div`
  display: inline-block;
  width: ${props => props.size || '20px'};
  height: ${props => props.size || '20px'};
  border: 3px solid rgba(0, 123, 255, 0.3);
  border-radius: 50%;
  border-top-color: #007bff;
  animation: spin 1s ease-in-out infinite;
  margin: ${props => props.margin || '0'};
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Loading container
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  gap: 20px;
`;