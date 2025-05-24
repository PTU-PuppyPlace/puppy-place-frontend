import { z } from 'zod';

export const changeNicknameSchema = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요'),
});

export type ChangeNicknameSchemaType = z.infer<typeof changeNicknameSchema>;
