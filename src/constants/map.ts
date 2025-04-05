export const NAVER_DIRECTION_URL = (
  latitude: number,
  longitude: number,
  name: string,
  placeId: number
) => {
  return `https://map.naver.com/p/directions/-/${latitude},${longitude},${name},${placeId},PLACE_POI/-/transit?c=15.00,0,0,0,dh`;
};

export const KAKAO_DIRECTION_URL =
  'https://map.kakao.com/?nil_profile=title&nil_src=local';

export const FILTER_OPTIONS = [
  { id: 'open', label: '영업중' },
  { id: 'reservation', label: '예약' },
  { id: '1km', label: '1km 반경' },
  { id: 'new', label: '신규오픈' },
  { id: 'trending', label: '요즘뜨는' },
];
