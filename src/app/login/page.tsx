'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Spacer from '@/components/common/Spacer';
import Link from 'next/link';
import { AppleButton, GoogleButton, KakaoButton } from './components';
import kakaoLogo from './kakao-logo.png';
import appleLogo from './apple-logo.png';
import googleLogo from './google-logo.png';

const Login = () => {
  return (
    <>
      <ButtonSection>
        <KakaoButton>
          <Image src={kakaoLogo} alt='kakao logo' />
          카카오로 시작하기
        </KakaoButton>
        <AppleButton>
          <Image src={appleLogo} alt='apple login button' />
          Apple로 시작하기
        </AppleButton>
        <GoogleButton>
          <Image src={googleLogo} alt='google login button' />
          Google로 시작하기
        </GoogleButton>
      </ButtonSection>
      <Spacer height={'24px'} />
      <StyledLink href='/login/email'>이메일로 시작하기</StyledLink>
    </>
  );
};

export default Login;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.gray.g100};
  font-size: ${({ theme }) => theme.body14};
  font-weight: ${({ theme }) => theme.medium};
  cursor: pointer;
`;
