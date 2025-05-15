// src/components/ProductForm.jsx - Complete rewrite
import React, { useState, useEffect } from 'react';
import { getImages } from '../services/api';
import styled from 'styled-components';

// Styled components for the form
const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 30px auto;
  padding: 20px;
  background-color: #fff;
  border: ${props => props.isEdit ? '2px solid #ffc107' : '1px solid #e1e1e1'};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.hasError ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.hasError ? '#dc3545' : '#ced4da'};
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: ${props => props.secondary ? '#6c757d' : '#007bff'};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: ${props => props.secondary ? '#5a6268' : '#0069d9'};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
`;

const EditModeIndicator = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  border: 1px solid #ffeeba;
`;

const ImageSelector = styled.div`
  margin-top: 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 15px;
  background-color: #f8f9fa;
`;

const ImageSelectorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin: 15px 0;
  
  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: border-color 0.2s ease;
    
    &:hover {
      border-color: #007bff;
    }
    
    &.selected {
      border-color: #007bff;
    }
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  display: block;
  margin: 10px 0;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

/**
 * ProductForm component - simplified version using regular React state
 */
const ProductForm = ({ formType = 'add', product = {}, onSubmit, onCancel }) => {
  // Create form state with initial values
  const [formValues, setFormValues] = useState({
    prod_name: product?.prod_name || '',
    price: product?.price || '',
    description: product?.description || '',
    imageURL: product?.imageURL || '',
    imageID: product?.imageID || ''
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // UI state
  const [previewURL, setPreviewURL] = useState(product?.imageURL || '');
  const [images, setImages] = useState([]);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Update form values when product changes
  useEffect(() => {
    if (product) {
      setFormValues({
        prod_name: product.prod_name || '',
        price: product.price || '',
        description: product.description || '',
        imageURL: product.imageURL || '',
        imageID: product.imageID || ''
      });
      setPreviewURL(product.imageURL || '');
    } else {
      // Reset form for add mode
      setFormValues({
        prod_name: '',
        price: '',
        description: '',
        imageURL: '',
        imageID: ''
      });
      setPreviewURL('');
    }
    
    // Reset errors when switching modes
    setErrors({});
  }, [product, formType]);
  
  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update the form values
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Update preview URL if imageURL changes
    if (name === 'imageURL') {
      setPreviewURL(value);
    }
  };
  
  /**
   * Validate the form
   * @returns {boolean} true if valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Validate product name
    if (!formValues.prod_name) {
      newErrors.prod_name = 'Product name is required';
    } else if (formValues.prod_name.length < 2) {
      newErrors.prod_name = 'Name must be at least 2 characters';
    }
    
    // Validate price
    if (!formValues.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formValues.price)) || parseFloat(formValues.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    // Validate description
    if (!formValues.description) {
      newErrors.description = 'Description is required';
    } else if (formValues.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    // Validate imageURL
    if (!formValues.imageURL) {
      newErrors.imageURL = 'Image URL is required';
    } else {
      const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)|\/images\/.+\.(jpg|jpeg|png|gif|webp))$/i;
      if (!urlPattern.test(formValues.imageURL)) {
        newErrors.imageURL = 'Enter a valid image URL (.jpg, .jpeg, .png, .gif, .webp)';
      }
    }
    
    // Update errors state
    setErrors(newErrors);
    
    // Form is valid if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  
  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Convert price to number
    const formattedData = {
      ...formValues,
      price: parseFloat(formValues.price)
    };
    
    // Submit the form
    onSubmit(formattedData);
  };
  
  /**
   * Fetch images from API
   */
  const fetchImages = async () => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      const imagesList = await getImages();
      setImages(imagesList || []);
      setShowImageSelector(true);
    } catch (err) {
      console.error('Error fetching images:', err);
      setErrorMessage('Failed to load images. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Select an image from the grid
   */
  const selectImage = (image) => {
    // Update form values with the selected image
    setFormValues(prev => ({
      ...prev,
      imageURL: image.imageURL || '',
      imageID: image.imageID || ''
    }));
    
    // Update preview URL
    setPreviewURL(image.imageURL || '');
  };
  
  return (
    <FormContainer isEdit={formType === 'edit'}>
      <FormTitle>
        {formType === 'add' ? 'Add New Product' : 'Edit Product'}
      </FormTitle>
      
      {formType === 'edit' && formValues.prod_name && (
        <EditModeIndicator>
          You are editing the product "{formValues.prod_name}". Changes will be saved when you click "Save Changes".
        </EditModeIndicator>
      )}
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="prod_name">Product Name</FormLabel>
          <FormInput
            id="prod_name"
            name="prod_name"
            value={formValues.prod_name}
            onChange={handleChange}
            hasError={!!errors.prod_name}
          />
          {errors.prod_name && <ErrorMessage>{errors.prod_name}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="price">Price ($)</FormLabel>
          <FormInput
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formValues.price}
            onChange={handleChange}
            hasError={!!errors.price}
          />
          {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="description">Description</FormLabel>
          <FormTextarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            hasError={!!errors.description}
          />
          {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="imageURL">Image URL</FormLabel>
          <FormInput
            id="imageURL"
            name="imageURL"
            value={formValues.imageURL}
            onChange={handleChange}
            hasError={!!errors.imageURL}
          />
          {errors.imageURL && <ErrorMessage>{errors.imageURL}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Button 
            type="button" 
            secondary 
            onClick={fetchImages}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Browse Available Images'}
          </Button>
        </FormGroup>
        
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        
        {showImageSelector && (
          <ImageSelector>
            <ImageSelectorHeader>
              <h3>Select an Image</h3>
              <Button type="button" secondary onClick={() => setShowImageSelector(false)}>
                Close
              </Button>
            </ImageSelectorHeader>
            
            <ImageGrid>
              {images && images.length > 0 ? (
                images.map(image => (
                  <img
                    key={image.imageID}
                    src={image.imageURL}
                    alt="Select this image"
                    className={formValues.imageID === image.imageID ? 'selected' : ''}
                    onClick={() => selectImage(image)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/no_image.jpg';
                    }}
                  />
                ))
              ) : (
                <div>No images available. Upload images first.</div>
              )}
            </ImageGrid>
          </ImageSelector>
        )}
        
        {previewURL && (
          <FormGroup>
            <FormLabel>Image Preview</FormLabel>
            <PreviewImage 
              src={previewURL} 
              alt="Product preview" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/no_image.jpg';
              }}
            />
          </FormGroup>
        )}
        
        <ButtonGroup>
          <Button type="submit">
            {formType === 'add' ? 'Add Product' : 'Save Changes'}
          </Button>
          <Button type="button" secondary onClick={onCancel}>
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default ProductForm;