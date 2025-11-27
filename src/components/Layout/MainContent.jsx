import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Plus, 
  Download, 
  Filter,
  Search,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Activity
} from 'lucide-react';
import Modal from '../Common/Modal';
import InputField from '../Forms/InputField';

const MainContainer = styled.main`
  grid-area: main;
  padding: ${props => props.theme.layout.spacing.xl};
  background: ${props => props.theme.colors.background};
  overflow-y: auto;
  min-height: calc(100vh - ${props => props.theme.layout.headerHeight});

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.layout.spacing.lg};
  }
`;

const WelcomeSection = styled.div`
  background: ${props => props.theme.colors.gradient.primary};
  color: white;
  padding: ${props => props.theme.layout.spacing.xl};
  border-radius: ${props => props.theme.layout.borderRadius.xl};
  margin-bottom: ${props => props.theme.layout.spacing.xl};
  box-shadow: ${props => props.theme.layout.shadow.lg};
`;

const WelcomeTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.layout.spacing.sm};
`;

const WelcomeSubtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  opacity: 0.9;
  margin-bottom: ${props => props.theme.layout.spacing.lg};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.layout.spacing.md};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.layout.spacing.sm};
  padding: ${props => props.theme.layout.spacing.md} ${props => props.theme.layout.spacing.lg};
  border: none;
  border-radius: ${props => props.theme.layout.borderRadius.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: white;
    color: ${props => props.theme.colors.primary};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.layout.shadow.lg};
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.layout.spacing.lg};
  margin-bottom: ${props => props.theme.layout.spacing.xl};
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.layout.spacing.xl};
  border-radius: ${props => props.theme.layout.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.layout.shadow.sm};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.layout.shadow.lg};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.accentColor || props.theme.colors.primary};
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: ${props => props.theme.layout.spacing.md};
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.layout.borderRadius.lg};
  background: ${props => props.accentColor}20;
  color: ${props => props.accentColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatInfo = styled.div`
  flex: 1;
  margin-left: ${props => props.theme.layout.spacing.md};
`;

const StatTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text.primary};
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props => props.positive ? props.theme.colors.success : props.theme.colors.error};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.layout.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const RecentActivity = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.layout.spacing.xl};
  border-radius: ${props => props.theme.layout.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: ${props => props.theme.layout.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.layout.spacing.md};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.layout.spacing.md};
  padding: ${props => props.theme.layout.spacing.md};
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.layout.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateX(4px);
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.layout.borderRadius.md};
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const QuickActions = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.layout.spacing.xl};
  border-radius: ${props => props.theme.layout.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.border};
`;

const ActionGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.layout.spacing.md};
`;

const ActionItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.layout.spacing.md};
  padding: ${props => props.theme.layout.spacing.lg};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.layout.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary}08;
    transform: translateY(-2px);
  }
`;

const ActionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.layout.borderRadius.md};
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionText = styled.div`
  flex: 1;
`;

const ActionTitle = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 4px;
`;

const ActionDescription = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const MainContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      positive: true,
      icon: DollarSign,
      accentColor: '#10B981'
    },
    {
      title: 'Active Users',
      value: '12,234',
      change: '+18.2%',
      positive: true,
      icon: Users,
      accentColor: '#3B82F6'
    },
    {
      title: 'Conversion Rate',
      value: '4.7%',
      change: '-2.3%',
      positive: false,
      icon: TrendingUp,
      accentColor: '#F59E0B'
    },
    {
      title: 'Avg. Session',
      value: '5m 24s',
      change: '+3.1%',
      positive: true,
      icon: Activity,
      accentColor: '#8B5CF6'
    }
  ];

  const activities = [
    {
      icon: Users,
      title: 'New user registered',
      time: '2 minutes ago',
      description: 'John Doe joined the platform'
    },
    {
      icon: DollarSign,
      title: 'Payment received',
      time: '1 hour ago',
      description: '$2,500 from Acme Inc'
    },
    {
      icon: TrendingUp,
      title: 'Sales target achieved',
      time: '3 hours ago',
      description: 'Monthly target exceeded by 15%'
    },
    {
      icon: Activity,
      title: 'System update',
      time: '5 hours ago',
      description: 'Performance improvements deployed'
    }
  ];

  const quickActions = [
    {
      icon: Plus,
      title: 'Create Project',
      description: 'Start a new project with team members'
    },
    {
      icon: Download,
      title: 'Export Data',
      description: 'Download reports and analytics'
    },
    {
      icon: Filter,
      title: 'Advanced Filters',
      description: 'Apply custom filters to your data'
    },
    {
      icon: Calendar,
      title: 'Schedule Event',
      description: 'Plan meetings and deadlines'
    }
  ];

  return (
    <MainContainer>
      <WelcomeSection>
        <WelcomeTitle>Welcome back, John! 👋</WelcomeTitle>
        <WelcomeSubtitle>
          Here's what's happening with your projects today. You have 5 new tasks and 3 pending requests.
        </WelcomeSubtitle>
        <ActionButtons>
          <Button className="primary">
            <Plus size={20} />
            New Project
          </Button>
          <Button className="secondary">
            <Download size={20} />
            Export Report
          </Button>
          <Button className="primary" onClick={() => setIsModalOpen(true)}>
            <Filter size={20} />
            Advanced Filters
          </Button>
        </ActionButtons>
      </WelcomeSection>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index} accentColor={stat.accentColor}>
            <StatHeader>
              <StatIcon accentColor={stat.accentColor}>
                <stat.icon size={24} />
              </StatIcon>
              <StatInfo>
                <StatTitle>{stat.title}</StatTitle>
                <StatValue>{stat.value}</StatValue>
              </StatInfo>
              <StatChange positive={stat.positive}>
                <TrendingUp size={16} />
                {stat.change}
              </StatChange>
            </StatHeader>
          </StatCard>
        ))}
      </StatsGrid>

      <ContentGrid>
        <RecentActivity>
          <SectionHeader>
            <SectionTitle>Recent Activity</SectionTitle>
            <Button className="secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>
              View All
            </Button>
          </SectionHeader>
          <ActivityList>
            {activities.map((activity, index) => (
              <ActivityItem key={index}>
                <ActivityIcon>
                  <activity.icon size={20} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <ActivityTime>{activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
          </ActivityList>
        </RecentActivity>

        <QuickActions>
          <SectionHeader>
            <SectionTitle>Quick Actions</SectionTitle>
          </SectionHeader>
          <ActionGrid>
            {quickActions.map((action, index) => (
              <ActionItem key={index} onClick={() => action.title === 'Advanced Filters' && setIsModalOpen(true)}>
                <ActionIcon>
                  <action.icon size={24} />
                </ActionIcon>
                <ActionText>
                  <ActionTitle>{action.title}</ActionTitle>
                  <ActionDescription>{action.description}</ActionDescription>
                </ActionText>
              </ActionItem>
            ))}
          </ActionGrid>
        </QuickActions>
      </ContentGrid>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Advanced Filters"
        size="medium"
        footer={
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button className="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button className="primary">
              Apply Filters
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <InputField
            label="Search Keywords"
            placeholder="Enter keywords to search..."
            leftIcon={<Search size={18} />}
          />
          
          <InputField
            label="Date Range"
            type="date"
            placeholder="Select date range"
          />
          
          <InputField
            label="Category"
            type="select"
            placeholder="Select category"
          />
          
          <InputField
            label="Status"
            type="select"
            placeholder="Select status"
          />
        </div>
      </Modal>
    </MainContainer>
  );
};

export default MainContent;