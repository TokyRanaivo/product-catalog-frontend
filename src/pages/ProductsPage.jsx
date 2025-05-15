// src/pages/ProductsPage.jsx
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
  Button,
  LoadingContainer,
  Spinner
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
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Add debug info
  console.log("ProductsPage rendering:", { user, isAuthenticated: isAuthenticated(), loading, view, selectedProduct });
  
  // Check authentication on mount
  useEffect(() => {
    console.log("Checking authentication:", user);
    if (!isAuthenticated()) {
      console.log("Not authenticated, redirecting to login");
      navigate('/login');
    } else {
      console.log("User is authenticated:", user);
    }
  }, [isAuthenticated, navigate, user]);
  
  // Fetch products on mount
  useEffect(() => {
    console.log("Fetching products...");
    fetchProducts();
  }, []);
  
  /**
   * Fetch products from API
   */
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log("Making API call to fetch products");
      const data = await getProducts();
      console.log("Products fetched:", data);
      setProducts(data || []); // Ensure we always set an array even if null is returned
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
      console.log("Adding product:", data);
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
      if (!selectedProduct || !selectedProduct.product_id) {
        throw new Error('No product selected for update');
      }
      
      console.log("Updating product:", data);
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
      console.log("Deleting product:", productId);
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
    console.log("Edit product clicked:", product);
    // Make a deep copy of the product to avoid reference issues
    const productToEdit = { ...product };
    
    // Make sure all fields are present even if they are empty
    productToEdit.prod_name = productToEdit.prod_name || '';
    productToEdit.price = productToEdit.price || '';
    productToEdit.description = productToEdit.description || '';
    productToEdit.imageURL = productToEdit.imageURL || '';
    productToEdit.imageID = productToEdit.imageID || '';
    
    console.log("Setting selected product for edit:", productToEdit);
    setSelectedProduct(productToEdit);
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
  
  // Show loading state
  if (loading) {
    return (
      <>
        <Header />
        <Container>
          <LoadingContainer>
            <Spinner size="40px" />
            <p>Loading products...</p>
          </LoadingContainer>
        </Container>
      </>
    );
  }
  
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