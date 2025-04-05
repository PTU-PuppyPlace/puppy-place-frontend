import styled from 'styled-components';
import { useState } from 'react';
import FilterIcon from '@/components/icons/interface-settings-filter.svg';
import FilterModal from '@/app/main/map/_components/FilterModal';
import { MapLocation } from '@/types/map';

export default function Filter({
  setLocations,
}: {
  setLocations: (locations: MapLocation[]) => void;
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  return (
    <>
      <FilterButton type='button' onClick={handleFilterClick}>
        <FilterIcon />
      </FilterButton>
      {isFilterOpen && (
        <FilterModal onClose={handleCloseFilter} setLocations={setLocations} />
      )}
    </>
  );
}
const FilterButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: 8px;
`;
