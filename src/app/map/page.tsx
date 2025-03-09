'use client';

import { styled } from 'styled-components';
import { useState } from 'react';
import Map from '@/components/Map';
import Marker from '@/components/Map/Marker';
import BottomTabBar from '@/components/layout/BottomTabbar';
import { NaverMap } from '@/types/map';

// 샘플 위치 데이터
const SAMPLE_LOCATIONS = [
  { id: 1, name: '강아지 공원 1', position: [37.5662952, 126.9779451] },
  { id: 2, name: '강아지 카페', position: [37.5657, 126.98] },
  { id: 3, name: '강아지 미용실', position: [37.568, 126.975] },
];

export default function MapPage() {
  const [map, setMap] = useState<NaverMap | null>(null);

  const handleMapLoad = (map: NaverMap) => {
    setMap(map);
  };

  const handleMarkerClick = (locationId: number) => {
    alert(
      `선택된 위치: ${
        SAMPLE_LOCATIONS.find((loc) => loc.id === locationId)?.name
      }`
    );
  };

  return (
    <Container>
      <MapContainer>
        <Map onLoad={handleMapLoad} />
        {map &&
          SAMPLE_LOCATIONS.map((location) => (
            <Marker
              key={location.id}
              map={map}
              position={location.position as [number, number]}
              onClick={() => handleMarkerClick(location.id)}
            />
          ))}
      </MapContainer>
      <BottomTabBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const MapContainer = styled.div`
  width: 100%;
  height: calc(
    100vh - ${({ theme }) => theme.bottomTabBarHeight}
  ); /* BottomTabBar 높이 고려 */
`;
