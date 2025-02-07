import { z } from 'zod';

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(1, '이메일 주소를 입력해 주세요.')
      .email('올바른 형식의 이메일을 입력해 주세요.'),
    password: z
      .string({
        required_error: '비밀번호를 입력해주세요',
      })
      .min(8, '숫자/영문/특수문자 8~16자로 입력해주세요.')
      .max(16, '숫자/영문/특수문자 8~16자로 입력해주세요.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};:'",.<>/?]{8,16}$/,
        '숫자/영문/특수문자 8~16자로 입력해주세요.'
      ),
    passwordConfirm: z.string().min(1, '비밀번호를 재입력해주세요'),
    nickname: z.string().min(1, '닉네임을 입력해주세요'),
    agreement: z.array(z.string()).min(4, '필수 항목에 동의해주세요'),
    isMarketingAgreed: z.boolean(),
    isEmailVerified: z.boolean(),
    isEmailSent: z.boolean().optional(),
    authCode: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
