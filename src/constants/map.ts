export const NAVER_DIRECTION_URL = (
  latitude: number,
  longitude: number,
  name: string,
  placeId: string
) => {
  return `https://map.naver.com/p/directions/-/${latitude},${longitude},${name},${placeId},PLACE_POI/-/transit?c=15.00,0,0,0,dh`;
};

export const KAKAO_DIRECTION_URL =
  'https://map.kakao.com/?nil_profile=title&nil_src=local';
