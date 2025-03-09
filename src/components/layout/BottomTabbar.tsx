'use client';

import React from 'react';
import styled from 'styled-components';
import MapIcon from '@/components/icons/navigation-maps-map.svg';
import PersonIcon from '@/components/icons/pets-animals-animal-passport-card.svg';
import theme from '@/styles/theme';
import { useRouter, usePathname } from 'next/navigation';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string, path: string) => void;
}

const BottomTabBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [activeTab, setActiveTab] = React.useState(() =>
    getActiveTab(pathname)
  );

  // pathname이 변경될 때마다 activeTab 업데이트
  React.useEffect(() => {
    setActiveTab(getActiveTab(pathname));
  }, [pathname]);

  const handleTabChange = (tabId: string, path: string) => {
    setActiveTab(tabId);
    router.push(path);
  };

  const tabs = [
    { id: 'map', label: '지도맵', icon: <MapIcon />, path: '/main/map' },
    {
      id: 'mypage',
      label: '마이페이지',
      icon: <PersonIcon />,
      path: '/main/mypage',
    },
  ];

  return (
    <BottomTabBarComponent
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  );
};

// 현재 경로에서 activeTab 결정
const getActiveTab = (path: string) => {
  if (path.includes('/main/map')) return 'map';
  if (path.includes('/main/mypage')) return 'mypage';
  return 'map'; // 기본값
};

const BottomTabBarComponent: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <TabBarContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id, tab.path)}
          aria-label={tab.label}
        >
          <TabIcon>{tab.icon}</TabIcon>
          <TabLabel>{tab.label}</TabLabel>
        </TabButton>
      ))}
    </TabBarContainer>
  );
};

const TabBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.extraWhite};
  padding: 10px 0;
  border-top: 1px solid ${({ theme }) => theme.gray.g10};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  height: ${({ theme }) => theme.bottomTabBarHeight};
`;

const TabButton = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 20px;
  color: ${(props) => (props.isActive ? theme.primary.p100 : theme.gray.g60)};

  &:hover {
    color: ${theme.primary.p100};
  }
`;

const TabIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    stroke-width: 1.5;
  }
`;

const TabLabel = styled.span`
  font-size: ${theme.caption10};
  font-weight: ${theme.bold};
`;

export default BottomTabBar;
