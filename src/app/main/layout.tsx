'use client';

import { styled } from 'styled-components';
import BottomTabBar from '@/components/layout/BottomTabbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Content>{children}</Content>
      <BottomTabBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  height: calc(
    100vh - ${({ theme }) => theme.bottomTabBarHeight}
  ); /* BottomTabBar 높이 고려 */
`;
