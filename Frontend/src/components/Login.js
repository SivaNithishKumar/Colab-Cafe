import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const AuthPage = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient-primary);
    opacity: 0.05;
    z-index: -1;
  }
`;

const AuthContainer = styled.div`
  width: 100%;
  max-width: 440px;
  margin: 1rem;
  padding: 3rem;
  background: var(--bg-color);
  border-radius: 24px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 2rem;
    border-radius: 20px;
  }
`;

const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
    letter-spacing: -0.03em;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-color);
  color: var(--text-color);
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary-color);
    box-shadow: var(--shadow-md);
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
  color: var(--text-color);
  opacity: 0.6;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--border-color);
  }

  span {
    margin: 0 1rem;
    font-weight: 500;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--text-color);
  }

  input {
    width: 100%;
    padding: 1rem;
    border: 2px solid var(--border-color);
    border-radius: 12px;
    background: var(--bg-color);
    color: var(--text-color);
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px var(--primary-color-alpha);
      outline: none;
    }
  }
`;

const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-color-dark);
  }
`;

const AuthFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);

  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.8;
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

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error);
    }
  };

  return (
    <AuthPage>
      <AuthContainer>
        <AuthHeader>
          <h1>Welcome Back</h1>
          <p>Log in to your account to continue</p>
        </AuthHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SocialLogin>
          <SocialButton type="button">
            <img
              src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/google/google.png"
              alt=""
              aria-hidden="true"
            />
            <span>Continue with Google</span>
          </SocialButton>
          <SocialButton type="button">
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt=""
              aria-hidden="true"
            />
            <span>Continue with GitHub</span>
          </SocialButton>
        </SocialLogin>

        <Divider>
          <span>or continue with email</span>
        </Divider>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              autoComplete="email"
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
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </FormGroup>
          <FormGroup>
            <ForgotPassword to="/forgot-password">Forgot password?</ForgotPassword>
          </FormGroup>
          <SubmitButton type="submit">
            Log In
          </SubmitButton>
        </form>

        <AuthFooter>
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </AuthFooter>
      </AuthContainer>
    </AuthPage>
  );
};

export default Login; 