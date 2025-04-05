export type NaverMap = naver.maps.Map;

type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

// 요일별 운영 시간 타입
export interface OperatingHoursDetail {
  day: string; // 예: '일', '월', ... '토'
  time: string; // 예: '08:00 - 22:30', '정기 휴무'
}

// 입장료 정보 타입
export interface EntryFeeInfo {
  type: string; // 예: '대인 입장료', '반려견 입장료'
  price: string; // 예: '10,000원'
}

export interface MapLocation {
  id: number;
  name: string;
  type: string; //애견동반 카페, 애견카페 등
  address: string; // 도로명 주소
  oldAddress: string; // 지번 주소
  coordinates: Coordinates; // 위도, 경도
  distance?: string;
  phone?: string;
  description?: string; // 상세 정보 (주차 안내 등)
  operatingStatus?: string; // 현재 영업 상태 (예: '영업중')
  operatingHoursDetail?: OperatingHoursDetail[]; // 요일별 운영 시간 상세
  entryRestriction?: string; // 입장 제한 안내 (예: '반려견 미동반시 14세 미만 출입 불가')
  entryFeeInfo?: EntryFeeInfo[]; // 입장료 정보
  website?: string; // 웹사이트/SNS 주소 (LocationInfo에서는 사용 안 함)
  photos?: string[]; // 장소 사진 URL 배열 (LocationInfo에서는 사용 안 함)
}
// 검색 기록 항목 타입 정의
export interface SearchHistoryItem {
  text: string;
  date: string; // 'YYYY.M.D.' 형식
}
