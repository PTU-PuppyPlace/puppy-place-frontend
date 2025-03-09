'use client';

import { useState } from 'react';
import Map from '@/components/map/Map';
import Marker from '@/components/map/Marker';
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
    <>
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
    </>
  );
}
