'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { Pet } from '@/types/pet'; // Pet 타입을 임포트합니다. 실제 경로에 맞게 조정해야 할 수 있습니다.
import theme from '@/styles/theme'; // 테마 파일을 임포트합니다.

interface PetListItemProps {
  pet: Pet;
}

export default function PetListItem({ pet }: PetListItemProps) {
  const calculateAge = (birthDate: Date): string => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    return `${age}년 ${month}개월`;
  };

  return (
    <ListItemContainer>
      <PetImageWrapper>
        <Image
          src={pet.profileImage}
          alt={pet.petName}
          width={75}
          height={75}
        />
        <TempImagePlaceholder />
      </PetImageWrapper>
      <PetInfo>
        <NameBreed>
          <Name>{pet.petName}</Name>
          <Breed>{pet.breed}</Breed> {/* Pet 타입에 breed 속성이 있다고 가정 */}
        </NameBreed>
        <Details>
          <Gender gender={pet.gender === 'male' ? 'MALE' : 'FEMALE'}>
            {pet.gender === 'male' ? '남아' : '여아'}
          </Gender>
          <Separator>·</Separator>
          <Age>{calculateAge(pet.birthdate)}</Age>{' '}
          {/* Pet 타입에 birthDate 속성이 있다고 가정 */}
          <Separator>·</Separator>
          <Weight>{pet.weight}kg</Weight>{' '}
          {/* Pet 타입에 weight 속성이 있다고 가정 */}
        </Details>
      </PetInfo>
    </ListItemContainer>
  );
}

const ListItemContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px 16px 16px;
  border: 1px solid ${theme.gray.g20};
  border-radius: 8px;
  background-color: ${theme.extraWhite};
  text-align: left; // button 요소 기본 스타일 초기화
  cursor: pointer; // 클릭 가능 표시

  &:hover {
    // 호버 시 약간의 배경색 변경 등 인터랙션 추가 가능
    background-color: ${theme.gray.g4};
  }
`;

const PetImageWrapper = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0; // 이미지가 줄어들지 않도록 설정
  background-color: ${theme.gray.g10}; // 이미지 로딩 중 배경색
`;

const TempImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.gray.g20}; // 임시 플레이스홀더 색상
`;

const PetInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  flex-grow: 1; // 남은 공간 채우기
`;

const NameBreed = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.span`
  font-size: ${theme.body14}; // 피그마 스타일 (14px, Bold)
  font-weight: ${theme.bold};
  color: ${theme.gray.g100}; // 피그마 스타일 (#333333)
`;

const Breed = styled.span`
  font-size: ${theme.body12}; // 피그마 스타일 (12px, Medium)
  font-weight: ${theme.medium}; // 피그마에서는 500 이지만 theme 에는 medium(400) 만 있어 사용
  color: ${theme.gray.g60}; // 피그마 스타일 (#858585)
  margin-top: 2px; // 이름과의 간격
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Gender = styled.span<{ gender: 'MALE' | 'FEMALE' }>`
  font-size: ${theme.body12}; // 피그마 스타일 (12px, Medium)
  font-weight: ${theme.medium}; // 피그마에서는 500 이지만 theme 에는 medium(400) 만 있어 사용
  color: ${({ gender }) =>
    gender === 'MALE'
      ? theme.pointBlue
      : theme.pointOrange}; // 남아/여아 색상 구분 (theme 에 pointOrange가 있다고 가정)
`;

const Separator = styled.span`
  font-size: ${theme.body13}; // 피그마 스타일 (13px, Medium)
  font-weight: ${theme.medium}; // 피그마에서는 500 이지만 theme 에는 medium(400) 만 있어 사용
  color: ${theme.gray.g40}; // 피그마 스타일 (#ADADAD)
`;

const Age = styled.span`
  font-size: ${theme.body12}; // 피그마 스타일 (12px, Regular)
  font-weight: ${theme.regular}; // 피그마에서는 400 이지만 theme 에는 regular(200) 만 있어 사용
  color: ${theme.gray.g60}; // 피그마 스타일 (#858585)
`;

const Weight = styled.span`
  font-size: ${theme.body12}; // 피그마 스타일 (12px, Regular)
  font-weight: ${theme.regular}; // 피그마에서는 400 이지만 theme 에는 regular(200) 만 있어 사용
  color: ${theme.gray.g60}; // 피그마 스타일 (#858585)
`;
