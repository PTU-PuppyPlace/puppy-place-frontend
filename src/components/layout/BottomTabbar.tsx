'use client';

import React from 'react';
import styled from 'styled-components';

interface TabItem {
  id: string;
  label: string;
  icon: string;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  padding: 10px 0;
  border-top: 1px solid #e1e1e1;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
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
  color: ${(props) => (props.isActive ? '#0068FF' : '#8E8E8E')};

  &:hover {
    color: #0068ff;
  }
`;

const TabIcon = styled.span`
  font-size: 20px;
`;

const TabLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

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
          onClick={() => onTabChange(tab.id)}
          aria-label={tab.label}
        >
          <TabIcon className='material-icons'>{tab.icon}</TabIcon>
          <TabLabel>{tab.label}</TabLabel>
        </TabButton>
      ))}
    </TabBarContainer>
  );
};

const BottomTabBar = () => {
  const [activeTab, setActiveTab] = React.useState('map');

  const tabs = [
    { id: 'map', label: '지도맵', icon: 'map' },
    { id: 'my-page', label: '마이페이지', icon: 'person' },
  ];

  return (
    <BottomTabBarComponent
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
};

export default BottomTabBar;
