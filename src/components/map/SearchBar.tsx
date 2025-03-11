'use client';

import { useState } from 'react';
import styled from 'styled-components';
import FilterIcon from '@/components/icons/interface-settings-filter.svg';
interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <SearchBarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='애견카페 검색'
        />
        <SearchButton type='submit'>
          <FilterIcon />
        </SearchButton>
      </SearchForm>
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  padding: 0 20px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  background-color: white;
  padding: 12px 16px;

  border: 1px solid ${({ theme }) => theme.gray.g20};
  box-shadow: ${({ theme }) => theme.shadow1};
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

const SearchButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: 8px;
`;

export default SearchBar;
