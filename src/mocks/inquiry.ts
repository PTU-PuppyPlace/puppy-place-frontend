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
  {
    id: 3,
    title: '기타 문의',
    date: '2024.01.05',
    question:
      '이런 기능이 있었으면 좋겠어요. 어딜 찾아도 없네요. 아직 없는 거 맞져? 너무 불편해요. 언제쯤 반영이 될까요?',
    images: [
      'https://picsum.photos/id/237/800/600',
      'https://picsum.photos/id/238/800/600',
      'https://picsum.photos/id/239/800/600',
    ],
    answer:
      '안녕하세요. 퍼피플레이스 CS담당자 어쩌구입니다. 좋은 의견 감사합니다. 아직은 그런 기능이 없습니다. 로콩, 수지님한테 말해둘게요 ㅠㅠ..ㅠㅠ',
    answerDate: '2024.04.09',
  },
];
