// src/pages/RegisterPage.jsx - Registration page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { register as registerUser } from '../services/api';
import {
  Container,
  FormContainer,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  Button,
  ErrorMessage,
  Alert
} from '../styles/StyledComponents';

/**
 * Registration page component
 */
const RegisterPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  
  // Watch password for confirmation validation
  const password = watch('password', '');

  /**
   * Handle form submission
   * @param {Object} data - Form data
   */
  const handleRegister = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Call register API
      await registerUser({
        username: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone
      });
      
      // Show success message and redirect after delay
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.error || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>Create an Account</FormTitle>
        
        {error && <Alert type="danger">{error}</Alert>}
        {success && <Alert type="success">{success}</Alert>}
        
        <form onSubmit={handleSubmit(handleRegister)}>
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              id="email"
              type="email"
              error={errors.email}
              {...register('email', { 
                required: 'Email is required',
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                  message: 'Invalid email address' 
                }
              })}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <FormInput
              id="name"
              error={errors.name}
              {...register('name', { 
                required: 'Full name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="phone">Phone Number</FormLabel>
            <FormInput
              id="phone"
              error={errors.phone}
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: { 
                  value: /^[0-9]{10,15}$/, 
                  message: 'Please enter a valid phone number (10-15 digits)' 
                }
              })}
            />
            {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              id="password"
              type="password"
              error={errors.password}
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <FormInput
              id="confirmPassword"
              type="password"
              error={errors.confirmPassword}
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </FormGroup>
        </form>
        
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </FormContainer>
    </Container>
  );
};

export default RegisterPage;