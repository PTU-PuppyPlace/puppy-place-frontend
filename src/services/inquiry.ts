import { MOCK_INQUIRIES } from '@/mocks/inquiry';
import { Inquiry } from '@/types/inquiry';

export const getInquiry = (): Inquiry[] => {
  return MOCK_INQUIRIES;
};
