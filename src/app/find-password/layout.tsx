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
        비밀번호 재설정
      </Header>
      <Section>{children}</Section>
    </>
  );
}

const Section = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;
