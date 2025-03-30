import LocationIcon from '@/components/icons/navigation-maps-arrow-location-map-direction.svg';
import CloseIcon from '@/components/icons/navigation-close.svg';
import PhoneIcon from '@/components/icons/phones-phone-call.svg';
import { MapLocation } from '@/types/map';
import styled from 'styled-components';

export default function LocationInfo({
  locationInfoRef,
  selectedLocation,
  closeLocationInfo,
}: {
  locationInfoRef: React.RefObject<HTMLDivElement>;
  selectedLocation: MapLocation;
  closeLocationInfo: () => void;
}) {
  return (
    <LocationInfoContainer ref={locationInfoRef}>
      <LocationInfoHeader>
        <LocationName>{selectedLocation.name}</LocationName>
        <CloseButton onClick={closeLocationInfo}>
          <CloseIcon width='20' height='20' />
        </CloseButton>
      </LocationInfoHeader>

      <LocationInfoContent>
        <LocationInfoItem>
          <LocationIcon width='20' height='20' />
          <LocationText>{selectedLocation.address}</LocationText>
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
      </LocationInfoContent>

      <ActionButtons>
        <ActionButton>전화하기</ActionButton>
        <ActionButton>길찾기</ActionButton>
        <ActionButton>공유하기</ActionButton>
      </ActionButtons>
    </LocationInfoContainer>
  );
}

const LocationInfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 16px 16px 0 0;
  box-shadow: ${({ theme }) => theme.shadow1};
  padding: 20px;
  z-index: 5;
  max-height: 50vh;
  overflow-y: auto;
`;

const LocationInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const LocationName = styled.h2`
  font-size: ${({ theme }) => theme.title19};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

const LocationInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LocationInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.gray.g80};
`;

const LocationText = styled.span`
  font-size: ${({ theme }) => theme.body14};
`;

const LocationDescription = styled.p`
  font-size: ${({ theme }) => theme.body14};
  color: ${({ theme }) => theme.gray.g80};
  line-height: 1.5;
  margin: 8px 0;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 12px;
`;

const ActionButton = styled.button`
  flex: 1;
  background-color: ${({ theme }) => theme.primary.p100};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: ${({ theme }) => theme.body14};
  font-weight: ${({ theme }) => theme.medium};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primary.p80};
  }
`;
