'use client';

import { useEffect } from 'react';
import { Coordinates, NaverMap } from '@/types/map';

type MarkerProps = {
  map: NaverMap;
  position: Coordinates;
  icon?: string;
  onClick?: () => void;
};

const Marker = ({ map, position, icon, onClick }: MarkerProps) => {
  useEffect(() => {
    if (!map || !window.naver) return;

    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(...position),
      map,
      icon: icon
        ? {
            url: icon,
            size: new window.naver.maps.Size(32, 32),
            origin: new window.naver.maps.Point(0, 0),
            anchor: new window.naver.maps.Point(16, 32),
          }
        : undefined,
    });

    if (onClick) {
      window.naver.maps.Event.addListener(marker, 'click', onClick);
    }

    return () => {
      marker.setMap(null);
    };
  }, [map, position, icon, onClick]);

  return null;
};

export default Marker;
