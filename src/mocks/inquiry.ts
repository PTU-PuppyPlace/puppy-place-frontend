import { Inquiry } from '@/types/inquiry';

export const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: 1,
    title: '로그인 관련 문의',
    date: '2024.07.21',
    question: '카카오 로그인이 안 돼요.',
    answer:
      '안녕하세요, 퍼피플레이스입니다. 현재 카카오 로그인 시스템 점검 중으로, 잠시 후 다시 시도해 주시기 바랍니다. 이용에 불편을 드려 죄송합니다.',
    answerDate: '2024.07.21',
  },
  {
    id: 2,
    title: '장소 등록 문의',
    date: '2024.07.20',
    question: '새로운 애견 카페를 등록하고 싶어요. 어떻게 하나요?',
  },
];
