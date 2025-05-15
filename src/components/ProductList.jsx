// src/components/ProductList.jsx - Component that displays all products
import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from './ProductCard';
import {
    Container,
    ProductGrid,
    Alert,
    LoadingContainer,
    Spinner
  } from '../styles/StyledComponents';
  
  /**
   * Component for displaying a grid of product cards
   * @param {Object} props - Component props
   * @param {Array} props.products - Array of product data
   * @param {boolean} props.loading - Loading state
   * @param {string} props.error - Error message if any
   * @param {Function} props.onEdit - Function to call when edit button is clicked
   * @param {Function} props.onDelete - Function to call when delete button is clicked
   * @param {Function} props.onRefresh - Function to refresh the product list
   */
  const ProductList = ({ products = [], loading, error, onEdit, onDelete, onRefresh }) => {
    console.log("ProductList rendering:", { products, loading, error });
    
    // If loading, show spinner
    if (loading) {
      return (
        <LoadingContainer>
          <Spinner size="40px" />
          <p>Loading products...</p>
        </LoadingContainer>
      );
    }
  
    // If error, show error message
    if (error) {
      return (
        <Container>
          <Alert type="danger">{error}</Alert>
        </Container>
      );
    }
  
    // If no products, show message
    if (!products || products.length === 0) {
      return (
        <Container>
          <Alert type="info">
            No products found. Add a new product to get started.
          </Alert>
        </Container>
      );
    }
  
    // Render product grid
    return (
      <Container>
        <ProductGrid>
          {products.map(product => (
            <ProductCard
              key={product.product_id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ProductGrid>
      </Container>
    );
  };
  
  export default ProductList;