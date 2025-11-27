import React from 'react';
import styled from 'styled-components';
import { 
  Home, 
  Layout, 
  Settings, 
  User, 
  BarChart3, 
  Mail, 
  Calendar,
  FileText,
  Shield,
  HelpCircle
} from 'lucide-react';

const SidebarContainer = styled.aside`
  grid-area: sidebar;
  background: ${props => props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.layout.spacing.lg} 0;
  overflow-y: auto;
  transition: all 0.3s ease;
  width: ${props => props.theme.layout.sidebarWidth};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: fixed;
    left: ${props => props.isOpen ? '0' : '-100%'};
    top: ${props => props.theme.layout.headerHeight};
    height: calc(100vh - ${props => props.theme.layout.headerHeight});
    z-index: 90;
    box-shadow: ${props => props.theme.layout.shadow.lg};
  }
`;

const MenuSection = styled.div`
  margin-bottom: ${props => props.theme.layout.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 ${props => props.theme.layout.spacing.lg};
  margin-bottom: ${props => props.theme.layout.spacing.sm};
`;

const MenuList = styled.ul`
  list-style: none;
`;

const MenuItem = styled.li`
  margin: 2px ${props => props.theme.layout.spacing.lg};
`;

const MenuLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.layout.spacing.md};
  padding: ${props => props.theme.layout.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: none;
  border-radius: ${props => props.theme.layout.borderRadius.md};
  transition: all 0.3s ease;
  cursor: pointer;
  font-weight: ${props => props.theme.typography.fontWeight.medium};

  &:hover {
    background: ${props => props.theme.colors.primary}10;
    color: ${props => props.theme.colors.primary};
    transform: translateX(4px);
  }

  &.active {
    background: ${props => props.theme.colors.primary}15;
    color: ${props => props.theme.colors.primary};
    border-left: 3px solid ${props => props.theme.colors.primary};
  }
`;

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = {
    main: [
      { icon: Home, label: 'Dashboard', active: true },
      { icon: Layout, label: 'Layout Builder' },
      { icon: BarChart3, label: 'Analytics' },
      { icon: Mail, label: 'Messages', badge: '5' },
      { icon: Calendar, label: 'Calendar' },
      { icon: FileText, label: 'Documents' }
    ],
    settings: [
      { icon: User, label: 'Profile' },
      { icon: Settings, label: 'Settings' },
      { icon: Shield, label: 'Security' },
      { icon: HelpCircle, label: 'Help Center' }
    ]
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <MenuSection>
        <SectionTitle>Main</SectionTitle>
        <MenuList>
          {menuItems.main.map((item, index) => (
            <MenuItem key={index}>
              <MenuLink className={item.active ? 'active' : ''}>
                <IconWrapper>
                  <item.icon size={18} />
                </IconWrapper>
                {item.label}
                {item.badge && (
                  <span style={{
                    marginLeft: 'auto',
                    background: '#EF4444',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '2px 8px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {item.badge}
                  </span>
                )}
              </MenuLink>
            </MenuItem>
          ))}
        </MenuList>
      </MenuSection>

      <MenuSection>
        <SectionTitle>Preferences</SectionTitle>
        <MenuList>
          {menuItems.settings.map((item, index) => (
            <MenuItem key={index}>
              <MenuLink>
                <IconWrapper>
                  <item.icon size={18} />
                </IconWrapper>
                {item.label}
              </MenuLink>
            </MenuItem>
          ))}
        </MenuList>
      </MenuSection>
    </SidebarContainer>
  );
};

export default Sidebar;