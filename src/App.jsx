import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Dashboard from './components/Dashboard';
import CustomizationPanel from './components/Customization/CustomizationPanel';
import { GlobalStyles, defaultTheme } from './styles/GlobalStyles';
import { userAPI, testConnection } from './services/api';

function AppContent() {
  const [customTheme, setCustomTheme] = useState(defaultTheme);
  const [userId] = useState('user123');
  const [serverStatus, setServerStatus] = useState('checking');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    await checkServerConnection();
    await loadUserPreferences();
  };

  const checkServerConnection = async () => {
    try {
      await testConnection();
      setServerStatus('connected');
    } catch (error) {
      setServerStatus('disconnected');
      console.log('Using local storage for preferences');
    }
  };

  const loadUserPreferences = async () => {
    try {
      const response = await userAPI.getPreferences(userId);
      if (response.data.theme) {
        setCustomTheme(prev => ({ ...prev, ...response.data.theme }));
      }
    } catch (error) {
      const localData = localStorage.getItem(`userPreferences_${userId}`);
      if (localData) {
        const { theme } = JSON.parse(localData);
        if (theme) setCustomTheme(prev => ({ ...prev, ...theme }));
      }
    }
  };

  const saveUserPreferences = async (theme) => {
    try {
      await userAPI.savePreferences(userId, { theme });
    } catch (error) {
      // Fallback to localStorage
      localStorage.setItem(`userPreferences_${userId}`, JSON.stringify({ theme, userId }));
    }
  };

  const updateTheme = (newTheme) => {
    setCustomTheme(newTheme);
  };

  const handleSaveTheme = async (theme) => {
    await saveUserPreferences(theme);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </Helmet>
      
      <GlobalStyles />
      <div className="app">
        <Dashboard 
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          onSidebarClose={() => setSidebarOpen(false)}
        />
        
        <CustomizationPanel
          onThemeChange={updateTheme}
          currentTheme={customTheme}
          onSave={handleSaveTheme}
        />

        {/* Server Status Indicator */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: serverStatus === 'connected' ? '#10B981' : '#F59E0B',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'currentColor',
            animation: serverStatus === 'connected' ? 'pulse 2s infinite' : 'none'
          }} />
          Server: {serverStatus === 'connected' ? 'Online' : 'Offline'}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </ThemeProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AppContent />
    </HelmetProvider>
  );
}

export default App;