'use client';

import styled from 'styled-components';
import SettingsIcon from '@/components/icons/interface-settings-gear.svg';

interface HeaderProps {
  onSettingsClick?: () => void;
}

export default function Header({ onSettingsClick }: HeaderProps) {
  return (
    <HeaderContainer>
      <Title>마이페이지</Title>
      <SettingsIconWrapper onClick={onSettingsClick}>
        <SettingsIcon stroke='#333' strokeWidth={2} />
      </SettingsIconWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.gray.g10};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.title19};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
`;

const SettingsIconWrapper = styled.div`
  cursor: pointer;
`;
