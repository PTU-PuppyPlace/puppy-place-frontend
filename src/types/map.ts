export type NaverMap = naver.maps.Map;

type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

export interface SearchLocation {
  id: string;
  name: string;
  address: string;
  distance?: string;
  coordinates: [number, number]; // 위도, 경도
}
// 검색 기록 항목 타입 정의
export interface SearchHistoryItem {
  text: string;
  date: string; // 'YYYY.M.D.' 형식
}
