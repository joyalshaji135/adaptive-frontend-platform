import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import ProfileModal from './ProfileModal';
import SettingsModal from './SettingsModal';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main";
  grid-template-rows: 70px 1fr;
  grid-template-columns: ${props => props.theme.layout.sidebarWidth} 1fr;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize};
  font-family: ${props => props.theme.typography.fontFamily};

  @media (max-width: 768px) {
    grid-template-areas: 
      "header"
      "main";
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr;
    
    &.sidebar-open {
      grid-template-areas: 
        "header"
        "sidebar";
      grid-template-rows: 60px 1fr;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 1000;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const EnhancedDashboard = () => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      bio: 'Frontend developer passionate about creating beautiful user interfaces.'
    },
    settings: {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisible: true,
        activityStatus: true
      },
      language: 'en',
      timezone: 'UTC'
    }
  });

  const handleSaveProfile = (profileData) => {
    setUserData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profileData }
    }));
    // Here you would typically call your API to save the data
    console.log('Saving profile:', profileData);
  };

  const handleSaveSettings = (settingsData) => {
    setUserData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settingsData }
    }));
    // Here you would typically call your API to save the data
    console.log('Saving settings:', settingsData);
  };

  const menuItems = [
    { label: 'Dashboard', icon: '📊', action: () => console.log('Dashboard clicked') },
    { label: 'Profile', icon: '👤', action: () => setProfileModalOpen(true) },
    { label: 'Settings', icon: '⚙️', action: () => setSettingsModalOpen(true) },
    { label: 'Messages', icon: '💬', action: () => console.log('Messages clicked') },
    { label: 'Analytics', icon: '📈', action: () => console.log('Analytics clicked') },
    { label: 'Documents', icon: '📁', action: () => console.log('Documents clicked') },
    { label: 'Calendar', icon: '📅', action: () => console.log('Calendar clicked') },
  ];

  return (
    <>
      <DashboardContainer className={isSidebarOpen ? 'sidebar-open' : ''}>
        <Header 
          onProfileClick={() => setProfileModalOpen(true)}
          onSettingsClick={() => setSettingsModalOpen(true)}
          userData={userData.profile}
        />
        <Sidebar 
          items={menuItems}
          isMobileOpen={isSidebarOpen}
          onMobileClose={() => setSidebarOpen(false)}
        />
        <MainContent 
          userData={userData}
          onEditProfile={() => setProfileModalOpen(true)}
        />
        
        <MobileMenuButton onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </DashboardContainer>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        userData={userData.profile}
        onSave={handleSaveProfile}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        settings={userData.settings}
        onSave={handleSaveSettings}
      />
    </>
  );
};

export default EnhancedDashboard;