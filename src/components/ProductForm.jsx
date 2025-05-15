// src/components/ProductForm.jsx - Form for adding/editing products
import { useState, useEffect } from 'react';
import { getImages } from '../services/api';
import { useForm } from 'react-hook-form';
import { 
  FormContainer, 
  FormTitle, 
  FormGroup, 
  FormLabel, 
  FormInput, 
  FormTextarea, 
  Button, 
  ErrorMessage,
  PreviewImage
} from '../styles/StyledComponents';
import styled from 'styled-components';

// Image selector styled components
const ImageSelector = styled.div`
  margin-top: 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 15px;
  background-color: #f8f9fa;
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

const ImageSelectorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

/**
 * Component for adding or editing product information
 * @param {Object} props - Component props
 * @param {string} props.formType - 'add' or 'edit'
 * @param {Object} props.product - Product data for editing (optional)
 * @param {Function} props.onSubmit - Submit handler function
 * @param {Function} props.onCancel - Cancel handler function
 */
const ProductForm = ({ formType = 'add', product = {}, onSubmit, onCancel }) => {
  console.log(`ProductForm rendering with formType: ${formType}, product:`, product);
  
  // Ensure product is an object even if null is passed
  const safeProduct = product || {};
  
  // Setup react-hook-form with validation
  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
    defaultValues: {
      prod_name: safeProduct.prod_name || '',
      price: safeProduct.price || '',
      description: safeProduct.description || '',
      imageURL: safeProduct.imageURL || '',
      imageID: safeProduct.imageID || ''
    }
  });
  
  // Watch the imageURL field for preview
  const watchImageURL = watch('imageURL');
  const watchImageID = watch('imageID');
  const [previewURL, setPreviewURL] = useState(safeProduct.imageURL || '');
  const [images, setImages] = useState([]);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Reset form values when product changes
  useEffect(() => {
    console.log("Product changed in ProductForm:", safeProduct);
    
    // Reset the form with the new product data
    reset({
      prod_name: safeProduct.prod_name || '',
      price: safeProduct.price || '',
      description: safeProduct.description || '',
      imageURL: safeProduct.imageURL || '',
      imageID: safeProduct.imageID || ''
    });
    
    // Update the preview URL
    setPreviewURL(safeProduct.imageURL || '');
    
  }, [safeProduct, reset]);
  
  // Update preview when imageURL changes
  useEffect(() => {
    if (watchImageURL) {
      setPreviewURL(watchImageURL);
    }
  }, [watchImageURL]);
  
  /**
   * Fetch images from API
   */
  const fetchImages = async () => {
    setLoading(true);
    setError('');
    
    try {
      const imagesList = await getImages();
      setImages(imagesList);
      setShowImageSelector(true);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to load images. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Select an image from the image grid
   * @param {Object} image - Image object with imageID and imageURL
   */
  const selectImage = (image) => {
    setValue('imageURL', image.imageURL);
    setValue('imageID', image.imageID);
    setPreviewURL(image.imageURL);
  };
  
  /**
   * Close the image selector
   */
  const closeImageSelector = () => {
    setShowImageSelector(false);
  };
  
  /**
   * Submit the form data to parent component
   * @param {Object} data - Form data
   */
  const submitForm = (data) => {
    // Convert price to number
    const formattedData = {
      ...data,
      price: parseFloat(data.price)
    };
    
    // Pass data to parent component
    onSubmit(formattedData);
  };
  
  return (
    <FormContainer>
      <FormTitle>
        {formType === 'add' ? 'Add New Product' : 'Edit Product'}
      </FormTitle>
      
      <form onSubmit={handleSubmit(submitForm)}>
        <FormGroup>
          <FormLabel htmlFor="prod_name">Product Name</FormLabel>
          <FormInput
            id="prod_name"
            error={errors.prod_name}
            {...register('prod_name', { 
              required: 'Product name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
          />
          {errors.prod_name && <ErrorMessage>{errors.prod_name.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="price">Price ($)</FormLabel>
          <FormInput
            id="price"
            type="number"
            step="0.01"
            error={errors.price}
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0.01, message: 'Price must be greater than 0' },
              pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Price must be a valid number' }
            })}
          />
          {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="description">Description</FormLabel>
          <FormTextarea
            id="description"
            error={errors.description}
            {...register('description', { 
              required: 'Description is required',
              minLength: { value: 10, message: 'Description must be at least 10 characters' }
            })}
          />
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="imageURL">Image URL</FormLabel>
          <FormInput
            id="imageURL"
            error={errors.imageURL}
            {...register('imageURL', { 
              required: 'Image URL is required',
              pattern: { 
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)|\/images\/.+\.(jpg|jpeg|png|gif|webp))$/i, 
                message: 'Enter a valid image URL (.jpg, .jpeg, .png, .gif, .webp)' 
              }
            })}
            onBlur={() => setPreviewURL(watchImageURL)}
          />
          {errors.imageURL && <ErrorMessage>{errors.imageURL.message}</ErrorMessage>}
        </FormGroup>
        
        {/* Hidden input for imageID */}
        <input 
          type="hidden" 
          {...register('imageID')}
        />
        
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
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {showImageSelector && (
          <ImageSelector>
            <ImageSelectorHeader>
              <h3>Select an Image</h3>
              <Button type="button" secondary onClick={closeImageSelector}>
                Close
              </Button>
            </ImageSelectorHeader>
            
            <ImageGrid>
              {images.map(image => (
                <img
                  key={image.imageID}
                  src={image.imageURL}
                  alt="Select this image"
                  className={parseInt(watchImageID) === image.imageID ? 'selected' : ''}
                  onClick={() => selectImage(image)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/no_image.jpg';
                  }}
                />
              ))}
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
        
        <FormGroup>
          <Button type="submit" marginRight>
            {formType === 'add' ? 'Add Product' : 'Save Changes'}
          </Button>
          <Button type="button" secondary onClick={onCancel}>
            Cancel
          </Button>
        </FormGroup>
      </form>
    </FormContainer>
  );
};

export default ProductForm;