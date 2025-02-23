'use server';
import { ActionState } from '@/types/auth';
import { login as loginService } from '@/services/account';

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
    const rawFormData = {
      username: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const response = await loginService(rawFormData);
    return response;
  } catch {
    return {
      errors: {
        email: '로그인에 실패했습니다.',
      },
    };
  }
}
