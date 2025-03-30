'use client';

import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import SearchIcon from '@/components/icons/interface-search-loupe.svg';
import CloseIcon from '@/components/icons/navigation-close.svg';
import WarningSvg from '@/components/icons/interface-warning.svg';
import LocationIcon from '@/components/icons/fill-marker.svg';
import ArrowRightIcon from '@/components/icons/navigation-right.svg';
import BackIcon from '@/components/icons/navigation-left.svg';
import { Alert } from '../../../../components/common/Alert';
import {
  deleteAllSearchHistory,
  getSearchHistory,
  getSearchResult,
} from '@/services/map';
import { MapLocation, SearchHistoryItem } from '@/types/map';

interface SearchResultsProps {
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
  onLocationSelect: (location: MapLocation) => void;
}

// 텍스트 강조 표시를 위한 함수
const highlightText = (text: string, query: string) => {
  if (!query.trim()) return <span>{text}</span>;

  // 정규 표현식 특수 문자 이스케이프 처리
  const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');

  // 문자열을 파트로 분리 (일치하는 부분과 일치하지 않는 부분으로 구분)
  const parts = [];
  let lastIndex = 0;
  let match;

  // text 내에서 모든 일치 항목 찾기
  while ((match = regex.exec(text)) !== null) {
    // 일치하는 부분 이전 텍스트 추가
    if (match.index > lastIndex) {
      parts.push({
        text: text.substring(lastIndex, match.index),
        highlight: false,
      });
    }

    // 일치하는 부분 추가
    parts.push({
      text: match[0],
      highlight: true,
    });

    lastIndex = regex.lastIndex;
  }

  // 마지막 일치 이후 남은 텍스트 추가
  if (lastIndex < text.length) {
    parts.push({
      text: text.substring(lastIndex),
      highlight: false,
    });
  }

  // 일치하는 항목이 없으면 원본 텍스트 반환
  if (parts.length === 0) {
    return <span>{text}</span>;
  }

  // 강조 표시가 적용된 JSX 반환
  return (
    <>
      {parts.map((part, i) =>
        part.highlight ? (
          <HighlightedText key={i}>{part.text}</HighlightedText>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
};

const SearchModal = ({
  query,
  onQueryChange,
  onClose,
  onLocationSelect,
}: SearchResultsProps) => {
  const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>([]);
  const [searchResults, setSearchResults] = useState<MapLocation[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 검색 기록 가져오기
  useEffect(() => {
    const data = getSearchHistory();

    setRecentSearches(data);
  }, []);

  // 검색어 변경 시 결과 업데이트
  useEffect(() => {
    const results = getSearchResult(query);
    setSearchResults(results);
  }, [query]);

  // 컴포넌트 마운트 시 input에 포커스
  useEffect(() => {
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  }, []);

  return (
    <FullScreenSearchContainer>
      <SearchHeader>
        <BackButton onClick={onClose}>
          <BackIcon width='20' height='20' />
        </BackButton>
        <SearchFormFullScreen>
          <SearchInputWrapper>
            <SearchIcon width='16' height='16' />
            <SearchInput
              ref={searchInputRef}
              autoFocus
              type='text'
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder='애견카페 검색'
            />
            {query && (
              <ClearButton onClick={() => onQueryChange('')}>
                <CloseIcon width='16' height='16' />
              </ClearButton>
            )}
          </SearchInputWrapper>
        </SearchFormFullScreen>
      </SearchHeader>

      <SearchContent>
        {query ? (
          // 검색 결과
          <>
            <SearchResultsHeader>
              <h3>{highlightText(query, query)}</h3>
            </SearchResultsHeader>
            {searchResults.length > 0 ? (
              <ResultsList>
                {searchResults.map((result) => (
                  <ResultItem
                    key={result.id}
                    onClick={() => onLocationSelect(result)}
                  >
                    <LocationIconWrapper>
                      <LocationIcon
                        style={{
                          width: '20',
                          height: '22',
                          stroke: 'none',
                        }}
                      />
                    </LocationIconWrapper>
                    <ResultInfo>
                      <ResultName>
                        {highlightText(result.name, query)}
                      </ResultName>
                      <ResultAddress>
                        {highlightText(result.address, query)}
                      </ResultAddress>
                    </ResultInfo>
                    {result.distance && (
                      <ResultDistance>{result.distance}</ResultDistance>
                    )}
                    <ArrowRightIcon width='16' height='16' />
                  </ResultItem>
                ))}
              </ResultsList>
            ) : (
              <NoResults>
                <WarningIcon />
                <p>검색 결과가 없습니다.</p>
              </NoResults>
            )}
          </>
        ) : (
          // 최근 검색어
          <>
            <SearchResultsHeader>
              <HeaderWithClearButton>
                <h3>최근 검색어</h3>
                {recentSearches.length > 0 && (
                  <ClearAll setRecentSearches={setRecentSearches} />
                )}
              </HeaderWithClearButton>
            </SearchResultsHeader>
            {recentSearches.length > 0 ? (
              <RecentSearchesList>
                {recentSearches.map((item, index) => (
                  <RecentSearchItem
                    key={index}
                    onClick={() => onQueryChange(item.text)}
                  >
                    <div className='search-icon'>
                      <SearchIcon width='20' height='20' />
                    </div>
                    <RecentSearchText>{item.text}</RecentSearchText>
                    <SearchItemRight>
                      <SearchDate>{item.date}</SearchDate>
                      <DeleteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          const newRecentSearches = recentSearches.filter(
                            (_, i) => i !== index
                          );
                          setRecentSearches(newRecentSearches);
                          // localStorage.setItem(
                          //   'recentSearches',
                          //   JSON.stringify(newRecentSearches)
                          // );
                        }}
                      >
                        <CloseIcon width='16' height='16' />
                      </DeleteButton>
                    </SearchItemRight>
                  </RecentSearchItem>
                ))}
              </RecentSearchesList>
            ) : (
              <NoResults>
                <WarningIcon />
                <p>최근 검색한 기록이 없습니다.</p>
              </NoResults>
            )}
          </>
        )}
      </SearchContent>
    </FullScreenSearchContainer>
  );
};

const ClearAll = ({
  setRecentSearches,
}: {
  setRecentSearches: Dispatch<SetStateAction<SearchHistoryItem[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // 모든 검색 기록 삭제
  const clearAllSearchHistory = () => {
    setRecentSearches([]);
    deleteAllSearchHistory();
  };
  return (
    <>
      <ClearAllButton
        onClick={() => {
          setIsOpen(true);
        }}
      >
        전체 삭제
      </ClearAllButton>
      <Alert
        isOpen={isOpen}
        actionLabel='삭제'
        cancelLabel='아니요'
        type='destructive'
        onClose={clearAllSearchHistory}
      >
        최근 검색기록을 전체 삭제 하시겠습니까?
      </Alert>
    </>
  );
};

const WarningIcon = () => (
  <WarningSvg
    style={{
      width: '48px',
      height: '48px',
    }}
  />
);

const FullScreenSearchContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  height: 100vh;
  background-color: white;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.gray.g10};
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  padding: 8px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SearchFormFullScreen = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
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

const ClearButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
`;

const SearchContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const SearchResultsHeader = styled.div`
  padding: 16px;

  h3 {
    font-size: ${({ theme }) => theme.body16};
    font-weight: ${({ theme }) => theme.medium};
    color: ${({ theme }) => theme.gray.g100};
    margin: 0;
  }
`;

const HeaderWithClearButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClearAllButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.caption12};
  color: ${({ theme }) => theme.gray.g60};
  cursor: pointer;
`;

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ResultItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.gray.g10};

  &:hover {
    background-color: ${({ theme }) => theme.gray.g4};
  }
`;

const LocationIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const ResultInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

const ResultName = styled.div`
  font-size: ${({ theme }) => theme.body16};
  color: ${({ theme }) => theme.gray.g100};
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResultAddress = styled.div`
  font-size: ${({ theme }) => theme.caption13};
  color: ${({ theme }) => theme.gray.g60};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 150%;
`;

const ResultDistance = styled.div`
  font-size: ${({ theme }) => theme.caption13};
  color: ${({ theme }) => theme.gray.g60};
  font-weight: ${({ theme }) => theme.bold};
  margin: 0 12px;
  white-space: nowrap;
`;

const NoResults = styled.div`
  padding: 40px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: ${({ theme }) => theme.body14};
    color: ${({ theme }) => theme.gray.g60};
    margin: 16px 0 0 0;
  }
`;

const RecentSearchesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RecentSearchItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.gray.g10};

  &:hover {
    background-color: ${({ theme }) => theme.gray.g4};
  }

  .search-icon {
    margin-right: 12px;
    color: ${({ theme }) => theme.gray.g60};
  }
`;

const RecentSearchText = styled.div`
  flex: 1;
  font-size: ${({ theme }) => theme.body14};
  color: ${({ theme }) => theme.gray.g100};
`;

const SearchItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchDate = styled.div`
  font-size: ${({ theme }) => theme.caption12};
  color: ${({ theme }) => theme.gray.g60};
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.gray.g40};

  &:hover {
    color: ${({ theme }) => theme.gray.g80};
  }
`;

const HighlightedText = styled.span`
  color: ${({ theme }) => theme.pointBlue};
`;

export default SearchModal;
