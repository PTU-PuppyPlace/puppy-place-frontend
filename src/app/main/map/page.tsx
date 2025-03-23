'use client';

import { useState, useRef } from 'react';
import styled from 'styled-components';
import Map from '@/components/map/Map';
import Marker from '@/components/map/Marker';
import SearchBar from '@/app/main/map/_components/SearchBar';
import { NaverMap, Coordinates } from '@/types/map';
import LocationIcon from '@/components/icons/navigation-maps-arrow-location-map-direction.svg';
import CloseIcon from '@/components/icons/navigation-close.svg';
import PhoneIcon from '@/components/icons/phones-phone-call.svg';

// 샘플 위치 데이터
const SAMPLE_LOCATIONS = [
  {
    id: 1,
    name: '강아지 공원 1',
    position: [37.5662952, 126.9779451] as [number, number],
  },
  {
    id: 2,
    name: '강아지 카페',
    position: [37.5657, 126.98] as [number, number],
  },
  {
    id: 3,
    name: '강아지 미용실',
    position: [37.568, 126.975] as [number, number],
  },
];

interface LocationDetail {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  phone?: string;
  distance?: string;
  description?: string;
}

export default function MapPage() {
  const [map, setMap] = useState<NaverMap | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationDetail | null>(null);
  const locationInfoRef = useRef<HTMLDivElement>(null);

  const handleMapLoad = (map: NaverMap) => {
    setMap(map);
  };

  const handleMarkerClick = (locationId: number) => {
    // 샘플 데이터에서 클릭한 위치 찾기
    const location = SAMPLE_LOCATIONS.find((loc) => loc.id === locationId);
    if (location) {
      // 실제로는 API에서 상세 정보를 가져옵니다
      const locationDetail: LocationDetail = {
        id: location.id.toString(),
        name: location.name,
        address: '서울시 중구 어딘가',
        coordinates: location.position,
        phone: '02-123-4567',
        description: '강아지와 함께할 수 있는 공간입니다.',
      };

      // 선택된 위치 정보 설정
      setSelectedLocation(locationDetail);

      // 지도 중심 이동
      if (map) {
        const position = new window.naver.maps.LatLng(...location.position);
        map.setCenter(position);
        map.setZoom(17); // 확대 레벨 조정
      }

      // 정보창으로 스크롤
      if (locationInfoRef.current) {
        locationInfoRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLocationSelect = (location: {
    id: string;
    name: string;
    address: string;
    coordinates: Coordinates;
    distance?: string;
  }) => {
    // 선택된 위치로 지도 이동
    if (map) {
      const position = new window.naver.maps.LatLng(...location.coordinates);
      map.setCenter(position);
      map.setZoom(17); // 확대 레벨 조정

      // 선택된 위치 정보 설정 (실제로는 API에서 상세 정보를 가져옵니다)
      const locationDetail: LocationDetail = {
        ...location,
        phone: '02-123-4567',
        description: '애견 카페입니다. 반려견과 함께 방문할 수 있어요.',
      };
      setSelectedLocation(locationDetail);
    }
  };

  const closeLocationInfo = () => {
    setSelectedLocation(null);
  };

  return (
    <MapContainer>
      <SearchBar onLocationSelect={handleLocationSelect} />
      <Map onLoad={handleMapLoad} />
      {map &&
        SAMPLE_LOCATIONS.map((location) => (
          <Marker
            key={location.id}
            map={map}
            position={location.position}
            onClick={() => handleMarkerClick(location.id)}
          />
        ))}

      {/* 선택된 위치가 있을 때 하단에 정보창 표시 */}
      {selectedLocation && (
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
      )}
    </MapContainer>
  );
}

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

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
