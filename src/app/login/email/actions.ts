'use server';
import { ActionState } from '@/types/auth';
import { login as loginService } from '@/services/account';
import { redirect } from 'next/navigation';

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

  const rawFormData = {
    username: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const response = await loginService(rawFormData);
  if (response.isSuccess) {
    return redirect('/map');
  } else {
    return {
      ...response,
      errors: {
        email: response.message,
      },
    };
  }
}
