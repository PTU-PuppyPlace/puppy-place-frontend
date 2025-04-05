'use client';

import { useState, useRef } from 'react';
import styled from 'styled-components';
import SearchIcon from '@/components/icons/interface-search-loupe.svg';
import SearchModal from '@/app/main/map/_components/SearchModal';
import { MapLocation } from '@/types/map';
import Filter from './Filter';

interface SearchBarProps {
  onLocationSelect?: (location: MapLocation) => void;
}

const SearchBar = ({ onLocationSelect }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleInputFocus = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleLocationSelectInternal = (location: MapLocation) => {
    if (onLocationSelect) {
      onLocationSelect(location);
    }
    setIsSearchOpen(false);
  };

  return (
    <>
      <SearchBarContainer ref={searchContainerRef}>
        <SearchBarContent>
          <SearchInputWrapper>
            <SearchIcon />
            <SearchInput
              type='text'
              value={query}
              onClick={handleInputFocus}
              placeholder='애견카페 검색'
              readOnly={!isSearchOpen}
            />
          </SearchInputWrapper>
          <Filter />
        </SearchBarContent>
      </SearchBarContainer>

      {isSearchOpen && (
        <SearchModal
          query={query}
          onQueryChange={handleQueryChange}
          onClose={handleCloseSearch}
          onLocationSelect={handleLocationSelectInternal}
        />
      )}
    </>
  );
};

const SearchBarContainer = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 1;
  padding: 0 20px;
`;

const SearchBarContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  background-color: white;
  padding: 12px 16px;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.gray.g20};
  box-shadow: ${({ theme }) => theme.shadow1};
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.body16};
  color: ${({ theme }) => theme.gray.g100};
  font-weight: ${({ theme }) => theme.medium};
  &::placeholder {
    color: ${({ theme }) => theme.gray.g40};
    font-weight: 400;
  }
`;

export default SearchBar;
