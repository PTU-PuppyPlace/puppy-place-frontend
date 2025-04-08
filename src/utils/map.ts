import { NaverMap } from '@/types/map';

export const moveToCurrentLocation = (map: NaverMap) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((geoPosition) => {
      const position = new window.naver.maps.LatLng(
        geoPosition.coords.latitude,
        geoPosition.coords.longitude
      );
      // if (geoPosition.coords.accuracy > 10) {
      //   toast('위치 정확도가 낮습니다.', { duration: 2000 });
      // }
      map.setCenter(position);
      map.setZoom(17); // 확대 레벨 조정
    });
  }
};
