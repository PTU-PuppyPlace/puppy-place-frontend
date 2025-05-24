'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import NavigationLeft from '@/components/icons/navigation-left.svg';
import Divider from '@/components/common/Divider';
import Button from '@/components/common/Button';
import { getAccountInfo } from '@/services/setting';
import LogoutIcon from '@/components/icons/interface-exit-log-out-arrow.svg';
import UserDeleteIcon from '@/components/icons/user-cross-delete_1.svg';
import { logout } from '@/services/account';

export default function AccountInfoPage() {
  const router = useRouter();
  const { nickname, email } = getAccountInfo();

  const handleGoBack = () => {
    router.push('/main/mypage/setting');
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleChangeNickname = () => {
    router.push('/main/mypage/setting/account-info/change-nickname');
  };

  const handleChangePassword = () => {
    router.push('/find-password');
  };

  return (
    <Container>
      <div>
        <HeaderContainer>
          <BackButton onClick={handleGoBack}>
            <NavigationLeft />
          </BackButton>
          <HeaderTitle>내 계정 정보</HeaderTitle>
        </HeaderContainer>

        <SectionTitle>회원 정보</SectionTitle>
        <SectionContainer>
          <SectionLabel>닉네임</SectionLabel>
          <Flex>
            <SectionText>{nickname}</SectionText>
            <Button onClick={handleChangeNickname}>닉네임 변경</Button>
          </Flex>
        </SectionContainer>
        <SectionContainer>
          <SectionLabel>이메일</SectionLabel>
          <SectionText>{email}</SectionText>
        </SectionContainer>
        <SectionContainer>
          <SectionLabel>비밀번호</SectionLabel>
          <Button onClick={handleChangePassword}>비밀번호 재설정</Button>
        </SectionContainer>
        <Divider noMargin />
      </div>
      <div>
        <ButtonSection onClick={handleLogout}>
          <LogoutIcon />
          로그아웃
        </ButtonSection>
        <ButtonSection>
          <UserDeleteIcon />
          회원정보 삭제하기
        </ButtonSection>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.extraWhite};
  justify-content: space-between;
  padding-bottom: 12px;
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

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.body13};
  color: ${({ theme }) => theme.gray.g100};
  padding: 24px 20px 0 20px;
`;

const SectionContainer = styled.div`
  padding: 12px 20px;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.gray.g10};
  display: flex;
  align-items: center;
`;

const SectionLabel = styled.span`
  font-size: ${({ theme }) => theme.body15};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g80};
  width: 100px;
`;

const SectionText = styled.span`
  font-size: ${({ theme }) => theme.body15};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g100};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonSection = styled.div`
  color: ${({ theme }) => theme.gray.g80};
  font-size: ${({ theme }) => theme.body15};
  font-weight: ${({ theme }) => theme.medium};
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  svg {
    font-size: 24px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.gray.g4};
  }
`;
