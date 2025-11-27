import { createGlobalStyle } from 'styled-components';

export const defaultTheme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      inverse: '#FFFFFF'
    },
    border: '#E5E7EB',
    gradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  layout: {
    sidebarWidth: '280px',
    headerHeight: '70px',
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px'
    },
    shadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'
    }
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px'
  }
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.typography.fontFamily};
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text.primary};
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.secondary};
  }

  /* Selection Styling */
  ::selection {
    background: ${props => props.theme.colors.primary}20;
    color: ${props => props.theme.colors.primary};
  }

  /* Focus Outline */
  *:focus {
    outline: 2px solid ${props => props.theme.colors.primary}40;
    outline-offset: 2px;
  }

  /* Responsive Images */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Smooth Transitions */
  button, input, select, textarea {
    transition: all 0.3s ease;
  }

  /* Button reset */
  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  /* Input reset */
  input, textarea, select {
    border: none;
    background: none;
    font-family: inherit;
  }

  /* Link reset */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* List reset */
  ul, ol {
    list-style: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }
  }

  /* Animation keyframes */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .loading {
    opacity: 0.6;
    pointer-events: none;
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
`;