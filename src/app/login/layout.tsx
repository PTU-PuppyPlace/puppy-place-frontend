'use client';

import Header from '@/components/layout/Header';
import Image from 'next/image';
import styled from 'styled-components';
import Spacer from '@/components/common/Spacer';
import loginLogo from './login-logo.png';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        onExit={() => {
          console.log('나가기');
        }}
      >
        이메일로 시작하기
      </Header>
      <Section>
        <Image src={loginLogo} alt='login logo' />
        <Spacer height={'60px'} />
        {children}
      </Section>
    </>
  );
}

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 44px;
  width: 100%;
  padding: 20px;
`;
