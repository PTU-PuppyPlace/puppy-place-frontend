'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import NavigationLeft from '@/components/icons/navigation-left.svg';
import { LinkSection, SectionTitle } from '../_components';
import Divider from '@/components/common/Divider';
import Button from '@/components/common/Button';
import { getVersion } from '@/services/setting';

export default function SettingPage() {
  const router = useRouter();
  const { version, latestVersion } = getVersion();

  const handleGoBack = () => {
    router.push('/main/mypage');
  };

  const handleAccountInfoClick = () => {
    router.push('/main/mypage/setting/account-info');
  };

  const handleServiceTermsClick = () => {
    router.push('/main/mypage/setting/service-term');
  };

  return (
    <Container>
      <HeaderContainer>
        <BackButton onClick={handleGoBack}>
          <NavigationLeft />
        </BackButton>
        <HeaderTitle>설정</HeaderTitle>
      </HeaderContainer>
      <SectionTitle>계정 설정</SectionTitle>
      <LinkSection title='내 계정 정보' onClick={handleAccountInfoClick} />
      <Divider noMargin />
      <SectionTitle>고객 지원</SectionTitle>
      <SectionContainer>
        <SectionText>버전 정보</SectionText>
        <Flex>
          <VersionText>
            현재 v {version} | 최신 v {latestVersion}{' '}
          </VersionText>
          <Button>업데이트</Button>
        </Flex>
      </SectionContainer>
      <LinkSection title='서비스 이용약관' onClick={handleServiceTermsClick} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.extraWhite};
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${({ theme }) => theme.extraWhite};
  border-bottom: 1px solid ${({ theme }) => theme.gray.g10};
  padding: 16px 20px;
  flex-shrink: 0; // Prevent header from shrinking
`;

const BackButton = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.gray.g80};
  svg {
    font-size: 24px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.title19};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g100};
  margin: 0; // Remove default margin
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const VersionText = styled.span`
  font-size: ${({ theme }) => theme.caption13};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g60};
`;

const SectionText = styled.h2`
  font-size: ${({ theme }) => theme.body17};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
`;

const SectionContainer = styled.div`
  padding: 12px 20px;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.gray.g10};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
