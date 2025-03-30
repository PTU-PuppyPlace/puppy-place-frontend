import { MapLocation } from '@/types/map';

export const SAMPLE_SEARCH_HISTORY = [
  { text: '무무 애견카페', date: '2024. 2. 2.' },
  { text: '로콩순이 카페', date: '2024. 1. 24.' },
];

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
    description: '애견 카페입니다. 반려견과 함께 방문할 수 있어요.',
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
    description: '반려견과 함께 즐거운 시간을 보낼 수 있는 카페입니다.',
  },
];
