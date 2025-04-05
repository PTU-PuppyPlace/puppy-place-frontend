'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Map from '@/components/map/Map';
import Marker from '@/components/map/Marker';
import SearchBar from '@/app/main/map/_components/SearchBar';
import { NaverMap } from '@/types/map';
import InfoDetail from '@/components/map/detail/InfoDetail';
import { useMapContext } from './_context/MapContext';
import { getLocation } from '@/services/map';

export default function MapPage() {
  const [map, setMap] = useState<NaverMap | null>(null);
  const { locations, setLocations, selectedLocation, setSelectedLocation } =
    useMapContext();

  useEffect(() => {
    const locations = getLocation({});
    setLocations(locations);
  }, []);

  useEffect(() => {
    if (map && selectedLocation) {
      const position = new window.naver.maps.LatLng(
        ...selectedLocation.coordinates
      );
      map.setCenter(position);
      map.setZoom(17); // 확대 레벨 조정
    }
  }, [selectedLocation]);

  const handleMapLoad = (map: NaverMap) => {
    setMap(map);
  };

  const handleMarkerClick = (locationId: number) => {
    // 샘플 데이터에서 클릭한 위치 찾기
    const location = locations.find((loc) => loc.id === locationId);
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

  const closeLocationInfo = () => {
    setSelectedLocation(null);
  };

  return (
    <MapContainer>
      <SearchBar />
      <Map onLoad={handleMapLoad} />
      {map &&
        locations.map((location) => (
          <Marker
            key={location.id}
            map={map}
            position={location.coordinates}
            onClick={() => handleMarkerClick(location.id)}
          />
        ))}

      {/* 선택된 위치가 있을 때 하단에 정보창 표시 */}
      {selectedLocation && (
        <InfoDetail
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
