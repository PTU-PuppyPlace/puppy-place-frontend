'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import NavigationLeft from '@/components/icons/navigation-left.svg';
import { getServiceTerm } from '@/services/setting';

export default function ServiceTermPage() {
  const router = useRouter();
  const { text } = getServiceTerm();

  const handleGoBack = () => {
    router.push('/main/mypage/setting');
  };

  return (
    <Container>
      <HeaderContainer>
        <BackButton onClick={handleGoBack}>
          <NavigationLeft />
        </BackButton>
        <HeaderTitle>서비스 이용약관</HeaderTitle>
      </HeaderContainer>
      <SectionText>{text}</SectionText>
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

const SectionText = styled.div`
  padding: 24px 20px 0 20px;
  font-size: ${({ theme }) => theme.body15};
  color: ${({ theme }) => theme.gray.g100};
  font-weight: ${({ theme }) => theme.medium};
  line-height: 1.5;
  white-space: pre-wrap;
`;
