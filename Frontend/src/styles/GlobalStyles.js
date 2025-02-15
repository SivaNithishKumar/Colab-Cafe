import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Light theme variables */
    --primary-color: #4f46e5;
    --primary-color-dark: #4338ca;
    --primary-color-alpha: rgba(79, 70, 229, 0.1);
    --text-color: #1f2937;
    --text-muted: #6b7280;
    --bg-color: #ffffff;
    --bg-hover: #f3f4f6;
    --border-color: #e5e7eb;
    --glass-bg: rgba(255, 255, 255, 0.8);
    --glass-border: rgba(255, 255, 255, 0.3);
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --gradient-primary: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
    --gradient-accent: linear-gradient(135deg, #06b6d4 0%, #4f46e5 100%);
  }

  [data-theme='dark'] {
    --primary-color: #6366f1;
    --primary-color-dark: #4f46e5;
    --primary-color-alpha: rgba(99, 102, 241, 0.1);
    --text-color: #f3f4f6;
    --text-muted: #9ca3af;
    --bg-color: #111827;
    --bg-hover: #1f2937;
    --border-color: #374151;
    --glass-bg: rgba(17, 24, 39, 0.8);
    --glass-border: rgba(55, 65, 81, 0.3);
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.5;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--primary-color-dark);
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .btn-primary {
    background: var(--primary-color);
    color: white;
    border: none;

    &:hover {
      background: var(--primary-color-dark);
      transform: translateY(-2px);
    }
  }

  .btn-secondary {
    background: var(--glass-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);

    &:hover {
      border-color: var(--primary-color);
      transform: translateY(-2px);
    }
  }

  .lead {
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.6;
  }

  .section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Animations */
  @keyframes fadeIn {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes textReveal {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes titleGlow {
    0%, 100% {
      filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0));
    }
    50% {
      filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  /* Loading Animation */
  .loading {
    width: 24px;
    height: 24px;
    border: 3px solid var(--border-color);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Grid Animations */
  .grid > * {
    opacity: 0;
    animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .grid > *:nth-child(1) { animation-delay: 0.1s; }
  .grid > *:nth-child(2) { animation-delay: 0.2s; }
  .grid > *:nth-child(3) { animation-delay: 0.3s; }
  .grid > *:nth-child(4) { animation-delay: 0.4s; }
  .grid > *:nth-child(5) { animation-delay: 0.5s; }
  .grid > *:nth-child(6) { animation-delay: 0.6s; }

  /* Card Animations */
  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.08),
        transparent
      );
      transform: skewX(-25deg);
      animation: cardShine 8s ease-in-out infinite;
    }

    &:hover::before {
      left: 150%;
    }
  }

  @keyframes cardShine {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(200%) rotate(45deg); }
  }

  /* Mobile Navigation Styles */
  .mobile-nav {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: var(--bg-color);
    padding: 2rem;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    &.active {
      transform: translateX(0);
      display: block;
    }
  }

  .mobile-nav-links {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin: 1rem 0;

      a {
        display: block;
        padding: 0.5rem 0;
        color: var(--text-color);
        text-decoration: none;
        font-size: 1.1rem;

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }

  .mobile-nav-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    transition: opacity 0.3s ease;

    &.active {
      opacity: 1;
      display: block;
    }
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .container {
      padding: 0 1.5rem;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.75rem;
    }

    .lead {
      font-size: 1.1rem;
    }

    .section-title {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    .nav-links {
      display: none;
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles; 