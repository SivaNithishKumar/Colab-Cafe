import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const NavContainer = styled.header`
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  text-decoration: none;
  &:hover {
    color: var(--primary-color);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  &:hover, &.active {
    color: var(--primary-color);
  }
`;

const MobileNavToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-color);
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-color);
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  font-weight: 500;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  padding: 0.5rem;
  min-width: 200px;
  z-index: 1000;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background: var(--bg-hover);
    }

    a {
      color: var(--text-color);
      text-decoration: none;
      display: block;
    }
  }
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const LogoImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  margin-right: 0.5rem;
`;

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMobileNavToggle = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
    document.body.style.overflow = !isMobileNavOpen ? 'hidden' : '';
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <NavContainer>
      <Nav>
        <NavLogo to="/">
          <LogoImage src="/logo.png" alt="Logo" />
          ProjectShowcase
        </NavLogo>
        <MobileNavToggle onClick={handleMobileNavToggle}>
          ☰
        </MobileNavToggle>
        <NavLinks className={isMobileNavOpen ? 'active' : ''}>
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/teams">Teams</NavLink></li>
          <li><NavLink to="/categories">Categories</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <NavbarRight>
            {user ? (
              <>
                <ProfileButton onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                  <img src={user.avatar || 'https://via.placeholder.com/32'} alt={user.username} />
                  {user.username}
                </ProfileButton>
                {isProfileDropdownOpen && (
                  <ProfileDropdown>
                    <ul>
                      <li>
                        <Link to={`/profile/${user.username}`} onClick={() => setIsProfileDropdownOpen(false)}>
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/settings" onClick={() => setIsProfileDropdownOpen(false)}>
                          Settings
                        </Link>
                      </li>
                      <li onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  </ProfileDropdown>
                )}
              </>
            ) : (
              <li><NavLink to="/login" className="btn btn-primary">Login</NavLink></li>
            )}
            <li><ThemeToggle onClick={toggleTheme}>🌓</ThemeToggle></li>
          </NavbarRight>
        </NavLinks>
      </Nav>
      {isMobileNavOpen && (
        <>
          <div className="mobile-nav active">
            <ul className="mobile-nav-links">
              <li><NavLink to="/projects" onClick={handleMobileNavToggle}>Projects</NavLink></li>
              <li><NavLink to="/teams" onClick={handleMobileNavToggle}>Teams</NavLink></li>
              <li><NavLink to="/categories" onClick={handleMobileNavToggle}>Categories</NavLink></li>
              <li><NavLink to="/about" onClick={handleMobileNavToggle}>About</NavLink></li>
              {user ? (
                <>
                  <li>
                    <Link to={`/profile/${user.username}`} onClick={handleMobileNavToggle}>
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" onClick={handleMobileNavToggle}>
                      Settings
                    </Link>
                  </li>
                  <li onClick={() => { handleLogout(); handleMobileNavToggle(); }}>
                    Logout
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/login" onClick={handleMobileNavToggle} className="btn btn-primary">
                    Login
                  </NavLink>
                </li>
              )}
              <li><ThemeToggle onClick={toggleTheme}>🌓</ThemeToggle></li>
            </ul>
          </div>
          <div className="mobile-nav-overlay active" onClick={handleMobileNavToggle} />
        </>
      )}
    </NavContainer>
  );
};

export default Navbar; 