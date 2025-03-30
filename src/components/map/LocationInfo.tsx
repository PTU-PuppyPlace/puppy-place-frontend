import DownIcon from '@/components/icons/navigation-down.svg';
import PhoneIcon from '@/components/icons/phones-phone-call.svg';
import { MapLocation } from '@/types/map';
import styled from 'styled-components';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useState } from 'react';
import AddressDetail from './AdressDetail';
export default function LocationInfo({
  selectedLocation,
  closeLocationInfo,
}: {
  selectedLocation: MapLocation;
  closeLocationInfo: () => void;
}) {
  const [addressOpen, setAddressOpen] = useState(false);
  return (
    <BottomSheet
      open={!!selectedLocation}
      onDismiss={closeLocationInfo}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, 300, maxHeight]}
      defaultSnap={({ snapPoints }) => snapPoints[1]}
      expandOnContentDrag
    >
      <LocationInfoContent>
        <LocationInfoHeader>
          <LocationName>{selectedLocation.name}</LocationName>
          <LocationType>{selectedLocation.type}</LocationType>
        </LocationInfoHeader>

        <LocationInfoItem>
          <LocationText>{selectedLocation.address}</LocationText>
          <DownIcon
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            onClick={() => {
              setAddressOpen((prev) => !prev);
            }}
          />
          {addressOpen && (
            <AddressDetail
              selectedLocation={selectedLocation}
              closeAddressDetail={() => setAddressOpen(false)}
            />
          )}
        </LocationInfoItem>

        {selectedLocation.phone && (
          <LocationInfoItem>
            <PhoneIcon width='20' height='20' />
            <LocationText>{selectedLocation.phone}</LocationText>
          </LocationInfoItem>
        )}

        {selectedLocation.description && (
          <LocationDescription>
            {selectedLocation.description}
          </LocationDescription>
        )}

        <ActionButtons>
          <ActionButton>전화하기</ActionButton>
          <ActionButton>길찾기</ActionButton>
          <ActionButton>공유하기</ActionButton>
        </ActionButtons>
      </LocationInfoContent>
    </BottomSheet>
  );
}

const LocationInfoContent = styled.div`
  padding: 0 20px;
`;

const LocationInfoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
`;

const LocationName = styled.h2`
  font-size: ${({ theme }) => theme.title19};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
  margin: 0;
`;

const LocationType = styled.span`
  font-size: ${({ theme }) => theme.caption13};
  color: ${({ theme }) => theme.gray.g60};
  font-weight: ${({ theme }) => theme.medium};
`;

const LocationInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.gray.g80};
  margin-bottom: 12px;
  position: relative;
`;

const LocationText = styled.span`
  font-size: ${({ theme }) => theme.body15};
  line-height: 1.5;
`;

const LocationDescription = styled.p`
  font-size: ${({ theme }) => theme.body14};
  color: ${({ theme }) => theme.gray.g80};
  line-height: 1.6;
  margin: 16px 0;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.gray.g10};
`;

const ActionButton = styled.button`
  flex: 1;
  background-color: ${({ theme }) => theme.primary.p100};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: ${({ theme }) => theme.body15};
  font-weight: ${({ theme }) => theme.medium};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primary.p80};
  }
`;
