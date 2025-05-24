'use client';

import Header from '@/components/layout/Header';
import styled from 'styled-components';

export default function FormLayout({
  children,
  onGoBack,
  headerText,
}: {
  children: React.ReactNode;
  onGoBack: () => void;
  headerText: string;
}) {
  return (
    <>
      <Header onGoBack={onGoBack}>{headerText}</Header>
      <Section>{children}</Section>
    </>
  );
}

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  padding: 20px;
  padding-top: 32px;
`;
