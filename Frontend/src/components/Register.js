import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const AuthContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-color);
  box-shadow: var(--shadow-md);
`;

const Title = styled.h1`
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const Subtitle = styled.p`
  color: var(--text-muted);
  margin-bottom: 1.5rem;
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--bg-hover);
    border-color: var(--primary-color);
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 1rem 0;
  position: relative;
  color: var(--text-muted);

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: var(--border-color);
  }

  &::before { left: 0; }
  &::after { right: 0; }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: var(--bg-color);
    color: var(--text-color);
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px var(--primary-color-alpha);
    }
  }

  &.checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
      width: auto;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-color-dark);
  }
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: var(--text-muted);

  a {
    color: var(--primary-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  background: #fee2e2;
  border: 1px solid #fecaca;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error);
    }
  };

  return (
    <AuthContainer>
      <Title>Create Account</Title>
      <Subtitle>Join our community of creators</Subtitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SocialLogin>
        <SocialButton>Continue with Google</SocialButton>
        <SocialButton>Continue with GitHub</SocialButton>
      </SocialLogin>

      <Divider>or</Divider>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup className="checkbox">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreeToTerms">
            I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
            <Link to="/privacy">Privacy Policy</Link>
          </label>
        </FormGroup>

        <SubmitButton type="submit">Create Account</SubmitButton>
      </form>

      <LoginLink>
        Already have an account? <Link to="/login">Log in</Link>
      </LoginLink>
    </AuthContainer>
  );
};

export default Register; 