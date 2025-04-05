'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@/components/icons/navigation-close.svg';
import TrashIcon from '@/components/icons/interface-trash-delete-bin-refresh.svg';
import { BottomSheet } from 'react-spring-bottom-sheet';
import theme from '@/styles/theme';
import Divider from '@/components/common/Divider';
import Select from '@/components/common/Select';
import { SAMPLE_DISTRICTS, SAMPLE_REGION } from '@/mocks/map';
import { getLocation } from '@/services/map';
import { FILTER_OPTIONS } from '@/constants/map';
import { useMapContext } from '../_context/MapContext';

interface FilterModalProps {
  onClose: () => void;
}

export default function FilterModal({ onClose }: FilterModalProps) {
  // 지역 선택 상태
  const [region, setRegion] = useState<string>('seoul');
  const [district, setDistrict] = useState<string>(
    SAMPLE_DISTRICTS[region]?.[0]?.value || ''
  );
  // 속성 옵션 상태
  const [options, setOptions] = useState<string[]>([]);
  const { setLocations, setSelectedLocation, locations } = useMapContext();

  const handleFilter = () => {
    const filteredLocations = getLocation(region, district, options);
    setLocations(filteredLocations);
    setSelectedLocation(filteredLocations[0]);
    onClose();
  };

  useEffect(() => {
    const filteredLocations = getLocation(region, district, options);
    setLocations(filteredLocations);
  }, [region, district, options]);

  // 속성 옵션 토글 함수
  const toggleProperty = (id: string) => {
    setOptions((options) => {
      if (options.includes(id)) {
        return options.filter((option) => option !== id);
      } else {
        return [...options, id];
      }
    });
  };

  // 필터 초기화 함수
  const resetFilters = () => {
    setDistrict('');
    setOptions([]);
  };

  return (
    <BottomSheet
      open={true}
      onDismiss={onClose}
      snapPoints={({ minHeight }) => [minHeight, theme.filterModalHeight]}
      defaultSnap={({ snapPoints }) => snapPoints[1]}
      expandOnContentDrag
      // BottomSheet 내부 스크롤 활성화
      style={{
        // @ts-expect-error // react-spring-bottom-sheet 타입 문제 임시 해결
        '--rsbs-overlay-background': 'rgba(0, 0, 0, 0.6)',
        '--rsbs-bg': '#FFFFFF',
        '--rsbs-handle-bg': theme.gray.g20,
        overflow: 'visible', // 내부 컨텐츠가 header 밖으로 나갈 수 있도록
      }}
    >
      <ModalContainer>
        <ModalHeader>
          <HeaderContent>
            <Title>필터</Title>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </HeaderContent>
          <Divider type='thin' />
        </ModalHeader>

        <ModalBody>
          <FilterSection>
            <FilterLabel>지역</FilterLabel>
            <SelectRow>
              <Select
                options={SAMPLE_REGION}
                name='region'
                placeholder='서울특별시'
                width='100%'
                onChange={(e) => setRegion(e.target.value)}
                value={region}
              />
              <Select
                options={SAMPLE_DISTRICTS[region] || []}
                name='district'
                placeholder='선택'
                width='100%'
                onChange={(e) => setDistrict(e.target.value)}
                value={district}
              />
            </SelectRow>
          </FilterSection>

          <FilterSection>
            <FilterLabel>속성</FilterLabel>
            <FilterChipsRow>
              {FILTER_OPTIONS.map((property) => (
                <FilterChip
                  key={property.id}
                  selected={options.includes(property.id)}
                  onClick={() => toggleProperty(property.id)}
                >
                  {property.label}
                </FilterChip>
              ))}
            </FilterChipsRow>
          </FilterSection>
          <Divider type='thin' />

          <ActionRow>
            <ResetButton onClick={resetFilters}>
              <TrashIcon />
              <span>재설정</span>
            </ResetButton>
            <ShowResultsButton onClick={handleFilter}>
              {locations.length}건 결과보기
            </ShowResultsButton>
          </ActionRow>
        </ModalBody>
        <HomeIndicator />
      </ModalContainer>
    </BottomSheet>
  );
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-weight: ${theme.bold};
  font-size: ${theme.title19};
  color: ${theme.gray.g100};
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: calc(24px - ${theme.dividerMargin}) 20px;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const FilterLabel = styled.div`
  font-weight: ${theme.bold};
  font-size: ${theme.body14};
  color: ${theme.gray.g100};
`;

const SelectRow = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const FilterChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  width: 100%;
`;

const FilterChip = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  height: 32px;
  border-radius: 1200px;
  border: 1px solid
    ${({ selected }) => (selected ? theme.primary.p50 : theme.gray.g20)};
  background-color: ${({ selected }) =>
    selected ? theme.primary.p20 : theme.extraWhite};
  font-size: ${theme.caption13};
  font-weight: ${theme.medium};
  color: ${({ selected }) => (selected ? theme.primary.p100 : theme.gray.g100)};
  cursor: pointer;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  font-size: ${theme.caption13};
  font-weight: ${theme.medium};
  color: ${theme.gray.g100};
  cursor: pointer;
`;

const ShowResultsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background-color: ${theme.primary.p100};
  color: ${theme.extraWhite};
  font-size: ${theme.body15};
  font-weight: ${theme.medium};
  cursor: pointer;
  flex: 1;
`;

const HomeIndicator = styled.div`
  align-self: center;
  width: 36px;
  height: 5px;
  background-color: #d6d6d6;
  border-radius: 100px;
  margin-bottom: 12px;
`;
