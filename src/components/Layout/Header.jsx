import React from 'react';
import styled from 'styled-components';
import { Bell, Search, User, Menu } from 'lucide-react';

const HeaderContainer = styled.header`
  grid-area: header;
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 0 ${props => props.theme.layout.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${props => props.theme.layout.headerHeight};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: ${props => props.theme.layout.shadow.sm};
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.layout.spacing.md};
`;

const Logo = styled.div`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  background: ${props => props.theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.layout.borderRadius.lg};
  padding: ${props => props.theme.layout.spacing.sm} ${props => props.theme.layout.spacing.md};
  min-width: 400px;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-width: 300px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  margin-left: ${props => props.theme.layout.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.layout.spacing.md};
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: ${props => props.theme.layout.spacing.sm};
  border-radius: ${props => props.theme.layout.borderRadius.md};
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary}10;
    color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background: ${props => props.theme.colors.error};
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.gradient.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${props => props.theme.layout.shadow.md};
  }
`;

const Header = ({ onMenuToggle }) => {
  return (
    <HeaderContainer>
      <LogoSection>
        <IconButton onClick={onMenuToggle}>
          <Menu size={20} />
        </IconButton>
        <Logo>RichUI</Logo>
      </LogoSection>

      <SearchBar>
        <Search size={18} color="currentColor" />
        <SearchInput placeholder="Search anything..." />
      </SearchBar>

      <Actions>
        <IconButton>
          <Bell size={20} />
          <NotificationBadge>3</NotificationBadge>
        </IconButton>
        
        <IconButton>
          <User size={20} />
        </IconButton>

        <UserAvatar>
          <User size={20} />
        </UserAvatar>
      </Actions>
    </HeaderContainer>
  );
};

export default Header;