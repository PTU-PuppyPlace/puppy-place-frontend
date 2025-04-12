'use client';

import styled from 'styled-components';

interface LinkSectionProps {
  title: string;
  onClick: () => void;
}

// 오른쪽 화살표 아이콘 컴포넌트
const ArrowRightIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M9 6L15 12L9 18'
      stroke='#333333'
      stroke-width='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default function LinkSection({ title, onClick }: LinkSectionProps) {
  return (
    <LinkSectionContainer onClick={onClick}>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <ArrowRightIcon />
      </SectionHeader>
    </LinkSectionContainer>
  );
}

const LinkSectionContainer = styled.div`
  padding: 12px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.gray.g4};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.body17};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
`;
