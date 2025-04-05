'use client';

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { MapLocation } from '@/types/map';
import { getLocation } from '@/services/map';

interface MapContextProps {
  locations: MapLocation[];
  setLocations: (locations: MapLocation[]) => void;
  selectedLocation: MapLocation | null;
  setSelectedLocation: (location: MapLocation | null) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(
    null
  );

  useEffect(() => {
    const locations = getLocation();
    setLocations(locations);
  }, []);

  return (
    <MapContext.Provider
      value={{
        locations,
        setLocations,
        selectedLocation,
        setSelectedLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
}
