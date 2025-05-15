// src/pages/ProductsPage.jsx - Main products page with CRUD functionality
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../services/api';
import AuthContext from '../contexts/AuthContext';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import Header from '../components/Header';
import { 
  Container, 
  Alert,
  Button
} from '../styles/StyledComponents';

/**
 * Main page component for product management
 * Handles product listing, adding, editing, and deleting
 */
const ProductsPage = () => {
  // State variables
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [view, setView] = useState('add'); // 'add' or 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Authentication context
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);
  
  /**
   * Fetch products from API
   */
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Handle form submission for adding a product
   * @param {Object} data - Product data from form
   */
  const handleAddProduct = async (data) => {
    try {
      await createProduct(data);
      await fetchProducts(); // Refresh product list
      setSuccessMessage('Product added successfully!');
      
      // Clear success message after delay
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.error || 'Failed to add product. Please try again.');
    }
  };
  
  /**
   * Handle form submission for editing a product
   * @param {Object} data - Product data from form
   */
  const handleUpdateProduct = async (data) => {
    try {
      await updateProduct(selectedProduct.product_id, data);
      await fetchProducts(); // Refresh product list
      setView('add'); // Reset to add mode
      setSelectedProduct(null);
      setSuccessMessage('Product updated successfully!');
      
      // Clear success message after delay
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.error || 'Failed to update product. Please try again.');
    }
  };
  
  /**
   * Handle product deletion
   * @param {number} productId - ID of product to delete
   */
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      await deleteProduct(productId);
      await fetchProducts(); // Refresh product list
      setSuccessMessage('Product deleted successfully!');
      
      // Clear success message after delay
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.error || 'Failed to delete product. Please try again.');
    }
  };
  
  /**
   * Handle edit button click
   * @param {Object} product - Product to edit
   */
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setView('edit');
    // Scroll to top to show form
    window.scrollTo(0, 0);
  };
  
  /**
   * Handle cancel button click
   */
  const handleCancel = () => {
    setView('add');
    setSelectedProduct(null);
    setError('');
  };
  
  // Form submission handler based on view
  const handleFormSubmit = view === 'add' ? handleAddProduct : handleUpdateProduct;
  
  return (
    <>
      <Header />
      <Container>
        {error && <Alert type="danger">{error}</Alert>}
        {successMessage && <Alert type="success">{successMessage}</Alert>}
        
        {/* Product Form */}
        <ProductForm 
          formType={view} 
          product={selectedProduct} 
          onSubmit={handleFormSubmit} 
          onCancel={handleCancel} 
        />
        
        {/* Product List */}
        <h2>Products</h2>
        <Button onClick={fetchProducts} marginRight>
          Refresh Products
        </Button>
        
        <ProductList
          products={products}
          loading={loading}
          error={error}
          onEdit={handleEditClick}
          onDelete={handleDeleteProduct}
          onRefresh={fetchProducts}
        />
      </Container>
    </>
  );
};

export default ProductsPage;