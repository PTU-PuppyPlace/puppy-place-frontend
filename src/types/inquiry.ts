// TODO: 실제 Inquiry 데이터 타입 정의 필요
export interface Inquiry {
  id: number;
  title: string;
  date: string;
  question: string;
  answer?: string; // 답변은 없을 수도 있음
  answerDate?: string;
  images?: string[];
}
