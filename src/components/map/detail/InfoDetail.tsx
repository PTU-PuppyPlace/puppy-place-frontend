import DownIcon from '@/components/icons/interface-down.svg';
import ClockIcon from '@/components/icons/fill-alarm-clock-time-timer.svg';
import WonIcon from '@/components/icons/won.svg';
import InfoIcon from '@/components/icons/info-information.svg';
import MarkerIcon from '@/components/icons/fill-marker.svg'; // 주소 아이콘
import UpIcon from '@/components/icons/interface-up.svg'; // 위쪽 화살표 (축소)
import styled from 'styled-components';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useState } from 'react';
import { MapLocation } from '@/types/map';
import theme from '@/styles/theme';
import Divider from '../../common/Divider';
import AddressDetail, { AddressDetailModal } from '../AdressDetail';
import ActionButtons from '../actionButtons/ActionButtons';

export default function InfoDetail({
  selectedLocation,
  closeLocationInfo,
}: {
  selectedLocation: MapLocation;
  closeLocationInfo: () => void;
}) {
  const [addressOpen, setAddressOpen] = useState(false);
  const [operatingHoursOpen, setOperatingHoursOpen] = useState(false);
  const [entryFeeOpen, setEntryFeeOpen] = useState(false);

  return (
    <BottomSheet
      open={!!selectedLocation}
      onDismiss={closeLocationInfo}
      snapPoints={({ minHeight, maxHeight }) => [
        minHeight,
        theme.locationInfoHeight,
        maxHeight,
      ]}
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
      <LocationInfoContent>
        {/* 상단 정보 (이름, 타입) */}
        <TopSection>
          <LocationName>{selectedLocation.name}</LocationName>
          <LocationType>{selectedLocation.type}</LocationType>
        </TopSection>

        <LocationInfoItem>
          <LocationText>{selectedLocation.address}</LocationText>
          <DownIcon
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            onClick={() => {
              setAddressOpen((prev) => !prev);
            }}
          />
          {addressOpen && (
            <AddressDetailModal
              selectedLocation={selectedLocation}
              closeAddressDetail={() => setAddressOpen(false)}
            />
          )}
        </LocationInfoItem>
        <ActionButtons />
        <Divider />
        {/* 상세 정보 섹션 */}
        <DetailsSection>
          {/* 주소 정보 */}
          <InfoBlock>
            <IconWrapper>
              <MarkerIcon />
            </IconWrapper>
            <InfoContent>
              <AddressDetail selectedLocation={selectedLocation} />
            </InfoContent>
          </InfoBlock>

          {/* 운영 시간 정보 */}
          {selectedLocation.operatingStatus &&
            selectedLocation.operatingHoursDetail && (
              <InfoBlock>
                <IconWrapper>
                  <ClockIcon />
                </IconWrapper>
                <InfoContent>
                  <ExpandableHeader
                    onClick={() => setOperatingHoursOpen(!operatingHoursOpen)}
                  >
                    <OperatingStatus open={operatingHoursOpen}>
                      {selectedLocation.operatingStatus}
                    </OperatingStatus>
                    <OperatingHoursSummary>
                      {selectedLocation.operatingHoursDetail[0]?.time}{' '}
                      {/* 첫 번째 시간 표시 */}
                    </OperatingHoursSummary>
                    {operatingHoursOpen ? (
                      <UpIcon width='16' height='16' />
                    ) : (
                      <DownIcon width='16' height='16' />
                    )}
                  </ExpandableHeader>
                  {operatingHoursOpen && (
                    <OperatingHoursDetails>
                      {selectedLocation.operatingHoursDetail.map((detail) => (
                        <OperatingHoursLine key={detail.day}>
                          <DayLabel>{detail.day}</DayLabel>
                          <TimeText>{detail.time}</TimeText>
                        </OperatingHoursLine>
                      ))}
                    </OperatingHoursDetails>
                  )}
                </InfoContent>
              </InfoBlock>
            )}

          {/* 요금 정보 */}
          {selectedLocation.entryRestriction &&
            selectedLocation.entryFeeInfo && (
              <InfoBlock>
                <IconWrapper>
                  <WonIcon />
                </IconWrapper>
                <InfoContent>
                  <ExpandableHeader
                    onClick={() => setEntryFeeOpen(!entryFeeOpen)}
                  >
                    <EntryRestrictionText>
                      {selectedLocation.entryRestriction}
                    </EntryRestrictionText>
                    {entryFeeOpen ? (
                      <UpIcon width='16' height='16' />
                    ) : (
                      <DownIcon width='16' height='16' />
                    )}
                  </ExpandableHeader>
                  {entryFeeOpen && (
                    <EntryFeeDetails>
                      {selectedLocation.entryFeeInfo.map((fee, index) => (
                        <EntryFeeLine key={index}>
                          <FeeType>{fee.type}</FeeType>
                          <FeePrice>{fee.price}</FeePrice>
                        </EntryFeeLine>
                      ))}
                    </EntryFeeDetails>
                  )}
                </InfoContent>
              </InfoBlock>
            )}

          {/* 상세 설명 (주차 등) */}
          {selectedLocation.description && (
            <InfoBlock>
              <IconWrapper>
                <InfoIcon />
              </IconWrapper>
              <InfoContent>
                <DescriptionText>
                  {selectedLocation.description}
                </DescriptionText>
              </InfoContent>
            </InfoBlock>
          )}
        </DetailsSection>
      </LocationInfoContent>
    </BottomSheet>
  );
}

const LocationInfoContent = styled.div`
  padding: 0 20px 20px; // 헤더 고려하여 상단 패딩 제거
  max-height: 80vh; // 최대 높이 지정하여 스크롤
  overflow-y: auto; // 내용 많으면 스크롤
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0 8px;
`;

const LocationName = styled.h2`
  font-size: ${({ theme }) => theme.title17};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.pointBlue};
  margin: 0;
`;

const LocationType = styled.span`
  font-size: ${({ theme }) => theme.caption13};
  color: ${({ theme }) => theme.gray.g60};
  font-weight: ${({ theme }) => theme.regular};
`;

const LocationInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.gray.g80};
  position: relative;
`;

const LocationText = styled.span`
  font-size: ${({ theme }) => theme.body15};
  line-height: 1.5;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; // 각 정보 블록 사이 간격
  padding-top: 16px;
`;

const InfoBlock = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start; // 아이콘과 내용 상단 정렬
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  color: ${({ theme }) => theme.gray.g70}; // 피그마 아이콘 색상

  svg {
    width: 20px;
    height: 22px;
    stroke: none;
  }
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px; // 내부 라인 간격
  flex: 1; // 남은 공간 차지
`;

// 운영 시간 관련 스타일
const ExpandableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  width: 100%;

  svg {
    color: ${({ theme }) => theme.gray.g60};
    stroke-width: 1.5;
    margin-left: auto; // 화살표 오른쪽 정렬
  }
`;

const OperatingStatus = styled.span<{ open: boolean }>`
  font-size: ${({ theme }) => theme.body15};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100}; // 수정: 항상 g100 색상 사용
`;

const OperatingHoursSummary = styled.span`
  font-size: ${({ theme }) => theme.body15};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g100};
`;

const OperatingHoursDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
`;

const OperatingHoursLine = styled.div`
  display: flex;
  gap: 1px;
`;

const DayLabel = styled.span`
  font-size: ${({ theme }) => theme.body15};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
  width: 20px; // 요일 너비 고정 (정렬용)
`;

const TimeText = styled.span`
  font-size: ${({ theme }) => theme.body15};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g100};
`;

// 요금 정보 관련 스타일
const EntryRestrictionText = styled.span`
  font-size: ${({ theme }) => theme.body15};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g100};
  flex: 1; // 텍스트가 남은 공간 차지
`;

const EntryFeeDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
`;

const EntryFeeLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FeeType = styled.span`
  font-size: ${({ theme }) => theme.body15};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g100};
`;

const FeePrice = styled.span`
  font-size: ${({ theme }) => theme.body15};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
`;

// 상세 설명 스타일
const DescriptionText = styled.p`
  // p 태그 사용
  font-size: ${({ theme }) => theme.body15};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g100};
  line-height: 1.6;
  white-space: pre-wrap; // 줄바꿈 및 공백 유지
  margin: 0; // 기본 마진 제거
`;
