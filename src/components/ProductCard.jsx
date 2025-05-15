// src/components/ProductCard.jsx - Card for displaying a product
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  ProductCard as Card,
  ProductImageContainer,
  ProductImage,
  ProductContent,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  ProductActions,
  IconButton
} from '../styles/StyledComponents';

/**
 * Component for displaying product information in a card format
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data to display
 * @param {Function} props.onEdit - Function to call when edit button is clicked
 * @param {Function} props.onDelete - Function to call when delete button is clicked
 */
const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <Card>
      <ProductImageContainer>
        <ProductImage 
          src={product.imageURL || '/images/no_image.jpg'} 
          alt={product.prod_name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/no_image.jpg';
          }}
        />
      </ProductImageContainer>
      
      <ProductContent>
        <ProductTitle>{product.prod_name}</ProductTitle>
        <ProductPrice>${parseFloat(product.price).toFixed(2)}</ProductPrice>
        
        <ProductDescription>
          {product.description || 'No description available.'}
        </ProductDescription>
        
        <ProductActions>
          <IconButton 
            color="#007bff" 
            onClick={() => onEdit(product)}
            title="Edit product"
          >
            <FaEdit />
          </IconButton>
          
          <IconButton 
            color="#dc3545" 
            onClick={() => onDelete(product.product_id)}
            title="Delete product"
          >
            <FaTrash />
          </IconButton>
        </ProductActions>
      </ProductContent>
    </Card>
  );
};

export default ProductCard;