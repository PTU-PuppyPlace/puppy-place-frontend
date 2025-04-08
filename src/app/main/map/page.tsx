'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Map from '@/components/map/Map';
import Marker from '@/components/map/Marker';
import SearchBar from '@/app/main/map/_components/SearchBar';
import { NaverMap, MapLocation } from '@/types/map';
import { SAMPLE_LOCATIONS } from '@/mocks/map';
import LocationInfo from '@/components/map/LocationInfo';
import { moveToCurrentLocation } from '@/utils/map';

export default function MapPage() {
  const [map, setMap] = useState<NaverMap | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(
    null
  );

  const handleMapLoad = (map: NaverMap) => {
    setMap(map);

    // 사용자 위치를 기본 위치로 설정
    moveToCurrentLocation(map);
  };

  const handleMarkerClick = (locationId: number) => {
    // 샘플 데이터에서 클릭한 위치 찾기
    const location = SAMPLE_LOCATIONS.find((loc) => loc.id === locationId);
    if (location) {
      // 선택된 위치 정보 설정
      setSelectedLocation(location);

      // 지도 중심 이동
      if (map) {
        const position = new window.naver.maps.LatLng(...location.coordinates);
        map.setCenter(position);
        map.setZoom(17); // 확대 레벨 조정
      }
    }
  };

  const handleLocationSelect = (location: MapLocation) => {
    // 선택된 위치로 지도 이동
    if (map) {
      const position = new window.naver.maps.LatLng(...location.coordinates);
      map.setCenter(position);
      map.setZoom(17); // 확대 레벨 조정

      setSelectedLocation(location);
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
            position={location.coordinates}
            onClick={() => handleMarkerClick(location.id)}
          />
        ))}

      {/* 선택된 위치가 있을 때 하단에 정보창 표시 */}
      {selectedLocation && (
        <LocationInfo
          selectedLocation={selectedLocation}
          closeLocationInfo={closeLocationInfo}
        />
      )}
    </MapContainer>
  );
}

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;
