import styled from 'styled-components';
import { useState } from 'react';
import FilterIcon from '@/components/icons/interface-settings-filter.svg';
import FilterModal from '@/app/main/map/_components/FilterModal';

export default function Filter() {
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
      {isFilterOpen && <FilterModal onClose={handleCloseFilter} />}
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
`;
