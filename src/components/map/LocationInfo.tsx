import DownIcon from '@/components/icons/navigation-down.svg';
import PhoneIcon from '@/components/icons/phones-phone-call.svg';
import NavigationIcon from '@/components/icons/navigation-maps-arrow-location-map-direction.svg';
import ShareIcon from '@/components/icons/interface-share.svg';
import { MapLocation } from '@/types/map';
import styled from 'styled-components';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useState } from 'react';
import AddressDetail from './AdressDetail';
import theme from '@/styles/theme';

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
      snapPoints={({ minHeight, maxHeight }) => [
        minHeight,
        theme.locationInfoHeight,
        maxHeight,
      ]}
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

        <ActionButtons>
          <ActionButton>
            <PhoneIcon width='24' height='24' />
            <ActionText>전화</ActionText>
          </ActionButton>
          <Divider />
          <ActionButton>
            <NavigationIcon width='24' height='24' />
            <ActionText>길찾기</ActionText>
          </ActionButton>
          <Divider />
          <ActionButton>
            <ShareIcon width='24' height='24' />
            <ActionText>공유</ActionText>
          </ActionButton>
        </ActionButtons>
      </LocationInfoContent>
    </BottomSheet>
  );
}

const LocationInfoContent = styled.div`
  padding: 0 20px;
  height: ${({ theme }) => theme.locationInfoHeight};
`;

const LocationInfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 0;
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
  position: relative;
`;

const LocationText = styled.span`
  font-size: ${({ theme }) => theme.body15};
  line-height: 1.5;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  color: ${({ theme }) => theme.gray.g100};

  svg {
    color: ${({ theme }) => theme.gray.g100};
    fill: none;
  }
`;

const ActionText = styled.span`
  font-size: ${({ theme }) => theme.body14};
  font-weight: ${({ theme }) => theme.medium};
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${({ theme }) => theme.gray.g20};
  margin: 0 4px;
`;
