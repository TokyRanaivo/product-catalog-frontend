// src/pages/LoginPage.jsx - Login page
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/api';
import AuthContext from '../contexts/AuthContext';
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
 * Login page component
 */
const LoginPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Handle form submission
   * @param {Object} data - Form data
   */
  const handleLogin = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      // Call login API
      const response = await login(data);
      
      // Store user data and token
      authLogin(response.user, response.token);
      
      // Redirect to products page
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.error || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>Login</FormTitle>
        
        {error && <Alert type="danger">{error}</Alert>}
        
        <form onSubmit={handleSubmit(handleLogin)}>
          <FormGroup>
            <FormLabel htmlFor="username">Email</FormLabel>
            <FormInput
              id="username"
              type="email"
              error={errors.username}
              {...register('username', { 
                required: 'Email is required',
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                  message: 'Invalid email address' 
                }
              })}
            />
            {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </FormGroup>
        </form>
        
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;