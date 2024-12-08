'use server';

interface LoginActionState {
  errors?: {
    email?: string;
    password?: string;
  };
  message?: string;
}

export async function login(currentState, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const errors: LoginActionState['errors'] = {};

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
      email: formData.get('email'),
      password: formData.get('password'),
    };
    console.log(rawFormData);
    return {
      message: '로그인 성공',
    };
  } catch (err) {
    return {
      errors: {
        email: '로그인에 실패했습니다.',
      },
    };
  }
}

export async function componentTestAction(currentState, formData: FormData) {
  console.log('sample action');
  console.log('TextField value: ', formData.get('TextField'));
  console.log('Checkbox value: ', formData.get('Checkbox'));
  console.log('CheckMark value: ', formData.get('Checkmark'));
  console.log('Select value: ', formData.get('Select'));
  console.log('TextArea value: ', formData.get('TextArea'));
  console.log('Segment value: ', formData.get('Segment'));
  return {
    message: 'sample action success',
  };
}
