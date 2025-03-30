export type NaverMap = naver.maps.Map;

type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

export interface MapLocation {
  id: number;
  name: string;
  type: string; //애견동반 카페, 애견카페 등
  address: string;
  oldAddress: string; // 지번 주소
  coordinates: Coordinates; // 위도, 경도
  distance?: string;
  phone?: string;
  description?: string;
}
// 검색 기록 항목 타입 정의
export interface SearchHistoryItem {
  text: string;
  date: string; // 'YYYY.M.D.' 형식
}
