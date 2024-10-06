'use client';

import Progress from '@/components/common/Progress';
import Header from '@/components/layout/Header';
import React from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const phase = pathname.split('/').pop();

  return (
    <>
      <Header
        onGoBack={() => {
          console.log('뒤로가기');
        }}
      >
        비밀번호 재설정
      </Header>
      <Section>
        <Progress phase={Number(phase)} />
        {children}
      </Section>
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
