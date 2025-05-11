'use client';

import styled from 'styled-components';

interface VisitedCafesSectionProps {
  cafes: any[]; // 타입은 후에 정확히 정의
  onSeeAll: () => void;
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

export default function VisitedCafesSection({
  cafes,
  onSeeAll,
}: VisitedCafesSectionProps) {
  const hasCafes = cafes && cafes.length > 0;

  return (
    <Section>
      <SectionHeader onClick={onSeeAll}>
        <SectionTitle>방문 카페</SectionTitle>
        <ArrowRightIcon />
      </SectionHeader>

      {!hasCafes ? (
        <EmptyVisitedContainer>
          <EmptyText>최근 방문한 카페가 없습니다.</EmptyText>
        </EmptyVisitedContainer>
      ) : (
        <CafeList>
          {/* 방문 카페 목록 표시 로직 추가 예정 */}
          {cafes.map((cafe) => (
            <CafeItem key={cafe.id}>{cafe.name}</CafeItem>
          ))}
        </CafeList>
      )}
    </Section>
  );
}

const Section = styled.div`
  padding: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.body17};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
`;

const EmptyVisitedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 108px;
`;

const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.body14};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g60};
`;

const CafeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CafeItem = styled.div`
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.gray.g4};
  font-size: ${({ theme }) => theme.body15};
  color: ${({ theme }) => theme.gray.g100};
`;
