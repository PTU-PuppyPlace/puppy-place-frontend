'use client';

import Header from '@/components/layout/Header';
import styled from 'styled-components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        onGoBack={() => {
          console.log('뒤로가기');
        }}
      >
        회원가입
      </Header>
      <Section>{children}</Section>
    </>
  );
}

const Section = styled.div`
  margin-top: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;
