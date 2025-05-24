import { SAMPLE_LOCATIONS, SAMPLE_SEARCH_HISTORY } from '@/mocks/map';
import { SearchHistoryItem, MapLocation } from '@/types/map';
import { formatSearchDate } from '@/utils/date';

export const deleteAllSearchHistory = () => {
  console.log('TODO: 모든 검색 기록 삭제');
};

export const getSearchHistory = () => {
  return SAMPLE_SEARCH_HISTORY;
};

export const saveSearchHistory = (query: string) => {
  const newItem: SearchHistoryItem = {
    text: query,
    date: formatSearchDate(new Date()),
  };
  const recentSearches = getSearchHistory();
  // 이미 있는 검색어는 추가하지 않음
  if (!recentSearches.some((item) => item.text === query)) {
    // TODO: search History 저장
    const newRecentSearches = [newItem, ...recentSearches];
    console.log('search history', newRecentSearches);
  }
};

export const getSearchResult = (query: string): MapLocation[] => {
  if (query.trim()) {
    // 최근 검색어 저장
    saveSearchHistory(query);
    return SAMPLE_LOCATIONS.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.address.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    return [];
  }
};

export const getLocation = ({
  region,
  district,
}: {
  region?: string;
  district?: string;
  options?: string[];
}): MapLocation[] => {
  if (region && district) {
    return SAMPLE_LOCATIONS.filter(
      (item) => item.address.includes(region) && item.address.includes(district)
    );
  } else {
    return SAMPLE_LOCATIONS;
  }
};
