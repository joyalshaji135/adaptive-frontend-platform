import React from 'react';
import styled from 'styled-components';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import MainContent from './Layout/MainContent';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main";
  grid-template-rows: ${props => props.theme.layout.headerHeight} 1fr;
  grid-template-columns: ${props => props.sidebarOpen ? props.theme.layout.sidebarWidth : '0'} 1fr;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.typography.fontFamily};
  transition: grid-template-columns 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 0 1fr;
    
    &[data-sidebar-open="true"] {
      grid-template-columns: 100% 0;
      
      &::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 80;
      }
    }
  }
`;

const Dashboard = ({ sidebarOpen, onSidebarToggle, onSidebarClose }) => {
  return (
    <DashboardContainer 
      data-sidebar-open={sidebarOpen}
      sidebarOpen={sidebarOpen}
      onClick={() => sidebarOpen && onSidebarClose()}
    >
      <Header onMenuToggle={onSidebarToggle} />
      <Sidebar isOpen={sidebarOpen} onClose={onSidebarClose} />
      <MainContent />
    </DashboardContainer>
  );
};

export default Dashboard;