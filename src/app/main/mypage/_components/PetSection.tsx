'use client';

import styled from 'styled-components';
import Button from '@/components/common/Button';

interface PetSectionProps {
  hasPets: boolean;
  onRegisterPet: () => void;
}

export default function PetSection({
  hasPets,
  onRegisterPet,
}: PetSectionProps) {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>내 반려동물</SectionTitle>
      </SectionHeader>

      {!hasPets ? (
        <PetRegistrationBox>
          <PetRegistrationText>
            함께 뛰어 놀 나의 반려동물을 등록해 주세요 :)
          </PetRegistrationText>
          <Button variant='default' size='40' onClick={onRegisterPet}>
            반려동물 등록하기
          </Button>
        </PetRegistrationBox>
      ) : (
        // 나중에 반려동물 목록 표시 로직 추가
        <PetListContainer>{/* 펫 목록 컴포넌트 추가 예정 */}</PetListContainer>
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
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.body17};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
`;

const PetRegistrationBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 24px 16px;
  border: 1px dashed ${({ theme }) => theme.gray.g20};
  border-radius: 8px;
`;

const PetRegistrationText = styled.p`
  font-size: ${({ theme }) => theme.body14};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g60};
  text-align: center;
  line-height: 1.5;
`;

const PetListContainer = styled.div`
  /* 나중에 펫 목록에 대한 스타일 추가 */
`;
