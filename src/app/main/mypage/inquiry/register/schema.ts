import { z } from 'zod';

// Zod 스키마 정의
export const inquiryRegisterSchema = z.object({
  type: z.string().min(1, '문의 유형을 선택해주세요.'),
  content: z.string().min(1, '문의 내용을 입력해주세요.'),
  images: z.array(z.string()).optional(),
});
export type InquiryRegisterSchemaType = z.infer<typeof inquiryRegisterSchema>;
