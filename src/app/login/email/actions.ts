'use server';
import { ActionState } from '@/types/auth';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function login(currentState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const errors: ActionState['errors'] = {};

  if (!email) {
    errors.email = '이메일을 입력해주세요';
  }

  if (!password) {
    errors.password = '비밀번호를 입력해주세요';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    await signIn('credentials', {
      username: email as string,
      password: password as string,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            errors: { password: '이메일 또는 비밀번호가 올바르지 않습니다.' },
          };
        default:
          return { errors: { password: '로그인 중 오류가 발생했습니다.' } };
      }
    }
    throw error;
  }
}
