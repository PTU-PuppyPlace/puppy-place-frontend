import { Coordinates, MapLocation } from '@/types/map';

export const SAMPLE_SEARCH_HISTORY = [
  { text: '무무 애견카페', date: '2024. 2. 2.' },
  { text: '로콩순이 카페', date: '2024. 1. 24.' },
];

export const INITIAL_COORDINATES: Coordinates = [37.556, 126.9235];

export const SAMPLE_LOCATIONS: MapLocation[] = [
  {
    id: 1,
    name: '무무 애견카페',
    type: '애견카페',
    address: '서울특별시 마포구 와우산로 100',
    oldAddress: '서울특별시 마포구 상수동 86-1',
    distance: '1.2km',
    coordinates: [37.557527, 126.924191] as [number, number],
    phone: '02-123-4567',
    description:
      '애견 카페입니다. 반려견과 함께 방문할 수 있어요.\n주차 가능합니다.',
    operatingStatus: '영업중',
    operatingHoursDetail: [
      { day: '월', time: '09:00 - 21:00' },
      { day: '화', time: '09:00 - 21:00' },
      { day: '수', time: '09:00 - 21:00' },
      { day: '목', time: '09:00 - 21:00' },
      { day: '금', time: '09:00 - 22:00' },
      { day: '토', time: '10:00 - 22:00' },
      { day: '일', time: '10:00 - 21:00' },
    ],
    entryRestriction: '10kg 미만 강아지만 입장 가능',
    entryFeeInfo: [
      { type: '대인 입장료', price: '8,000원' },
      { type: '반려견 입장료', price: '2,000원' },
    ],
  },
  {
    id: 2,
    name: '로콩순이 카페',
    type: '애견동반 카페',
    address: '서울특별시 마포구 양화로 4',
    oldAddress: '서울특별시 마포구 양화동 132-2',
    distance: '1.5km',
    coordinates: [37.556723, 126.923112] as [number, number],
    phone: '02-987-6543',
    description:
      '지하철 7호선 어린이대공원역 3번출구 바로 앞 우측건물 3층 입니다.\nx주차불가x\n\n주변 유료주차장 이용해 주세요.\n*광진광장공영 유료주차장\n(주차 후 사거리로 올라오시면 3번출구 앞이 카페 입니다)\n* ﻿AJ파크 어린이회관점 유료주차장 (주차 후 왼쪽 끝까지 가셔서 길 건너편 카페 입니다)\n* ﻿KCC파크타운 유료주차장\n(주차 후 건물밖으로',
    operatingStatus: '영업중',
    operatingHoursDetail: [
      { day: '일', time: '08:00 - 22:30' },
      { day: '월', time: '08:00 - 22:30' },
      { day: '화', time: '08:00 - 22:30' },
      { day: '수', time: '08:00 - 22:30' },
      { day: '목', time: '08:00 - 22:30' },
      { day: '금', time: '08:00 - 22:30' },
      { day: '토', time: '08:00 - 22:30' },
    ],
    entryRestriction: '반려견 미동반시 14세 미만 출입 불가',
    entryFeeInfo: [
      { type: '대인 입장료 (14세 이상)', price: '10,000원' },
      { type: '소인 입장료', price: '5,000원' },
      { type: '반려견 입장료', price: '3,000원' },
      // 피그마에는 동일한 "반려견 입장료" 항목이 여러 개 있지만, 여기서는 하나로 합칩니다.
    ],
  },
];
