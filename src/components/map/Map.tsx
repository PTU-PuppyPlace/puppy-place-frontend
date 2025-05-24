'use client';

import Script from 'next/script';
import { useRef } from 'react';
import styled from 'styled-components';
import { Coordinates, NaverMap } from '@/types/map';
import { INITIAL_COORDINATES } from '@/mocks/map';

// 초기 중심 좌표 (서울시청)
const INITIAL_ZOOM = 15;

type MapProps = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

const Map = ({
  initialCenter = INITIAL_COORDINATES,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const initializeMap = () => {
    if (!window.naver) return;

    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 10,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: window.naver.maps.Position.BOTTOM_LEFT,
      },
    };

    const map = new window.naver.maps.Map(mapRef.current!, mapOptions);

    if (onLoad) {
      onLoad(map);
    }
  };

  return (
    <>
      <Script
        strategy='afterInteractive'
        type='text/javascript'
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <MapContainer ref={mapRef} />
    </>
  );
};

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
