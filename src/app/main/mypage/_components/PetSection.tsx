'use client';

import styled from 'styled-components';
import Button from '@/components/common/Button';
import { Pet } from '@/types/pet';
import PetListItem from './PetListItem';
import PlusIcon from '@/components/icons/interface-plus-add.svg';
import theme from '@/styles/theme';
import { useRef, useState } from 'react';

interface PetSectionProps {
  pets: Pet[];
  onRegisterPet: () => void;
}

export default function PetSection({ pets, onRegisterPet }: PetSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftStart(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!scrollRef.current) return;
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
  };

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          내 반려동물
          <PetCount pets={pets} />
        </SectionTitle>
      </SectionHeader>

      {pets.length === 0 ? (
        <PetRegistrationBox>
          <PetRegistrationText>
            함께 뛰어 놀 나의 반려동물을 등록해 주세요 :)
          </PetRegistrationText>
          <Button variant='default' size='40' onClick={onRegisterPet}>
            반려동물 등록하기
          </Button>
        </PetRegistrationBox>
      ) : (
        <PetListContainer
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          isDragging={isDragging}
        >
          {pets.map((pet) => (
            <PetListItem key={pet.id} pet={pet} />
          ))}
          <AddPetButton onClick={onRegisterPet}>
            <PlusIcon
              style={{ width: '40px', height: '40px', stroke: 'white' }}
            />
            <AddPetText>반려동물 등록하기</AddPetText>
          </AddPetButton>
        </PetListContainer>
      )}
    </Section>
  );
}

const PetCount = ({ pets }: { pets: any[] }) => {
  if (pets.length === 0) {
    return null;
  }
  return <PetCountText> ({pets.length})</PetCountText>;
};

const Section = styled.div`
  padding: 20px;
`;

const PetCountText = styled.span`
  font-size: ${({ theme }) => theme.body14};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g60};
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
  padding: 16px;
  padding-right: 24px;
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

const PetListContainer = styled.div<{ isDragging?: boolean }>`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  cursor: grab;
  user-select: none;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    flex-shrink: 0;
  }
`;

const AddPetButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px dashed ${theme.gray.g20};
  border-radius: 8px;
  background-color: ${theme.extraWhite};
  cursor: pointer;
  min-width: 120px;

  &:hover {
    background-color: ${theme.gray.g4};
  }
`;

const AddPetText = styled.span`
  font-size: ${theme.body13};
  font-weight: ${theme.medium};
  color: ${theme.gray.g60};
  text-align: center;
  line-height: 1.5;
`;
