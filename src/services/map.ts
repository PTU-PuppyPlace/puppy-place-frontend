import { SearchHistoryItem, SearchLocation } from '@/types/map';
import { formatSearchDate } from '@/utils/date';

export const deleteAllSearchHistory = () => {
  console.log('TODO: 모든 검색 기록 삭제');
};

export const getSearchHistory = () => {
  const dummyData: SearchHistoryItem[] = [
    { text: '무무 애견카페', date: '2024. 2. 2.' },
    { text: '로공순이 카페', date: '2024. 1. 24.' },
  ];

  return dummyData;
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

export const getSearchResult = (query: string): SearchLocation[] => {
  if (query.trim()) {
    // 최근 검색어 저장
    saveSearchHistory(query);
    return [
      {
        id: '1',
        name: '홍대입구 퍼피 카페',
        address: '서울특별시 마포구 와우산로 100',
        distance: '1.2km',
        coordinates: [37.557527, 126.924191] as [number, number],
      },
      {
        id: '2',
        name: '홍대 강아지 카페',
        address: '서울특별시 마포구 와우산로 27번길 49',
        distance: '1.5km',
        coordinates: [37.556723, 126.923112] as [number, number],
      },
    ].filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.address.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    return [];
  }
};
