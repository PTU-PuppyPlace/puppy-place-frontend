'use client';

import Progress from '@/components/common/Progress';
import Header from '@/components/layout/Header';
import React from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const phase = pathname.split('/').pop();

  return (
    <>
      <Header
        onGoBack={() => {
          router.push('/main/mypage/setting/account-info');
        }}
      >
        닉네임 변경
      </Header>
      <Progress phase={Number(phase)} />
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
  padding: 20px;
`;
