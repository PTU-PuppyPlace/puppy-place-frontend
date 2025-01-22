'use server';

import { SignupSchemaType } from './schema';

type SignupState = {
  errors?: {
    username?: string;
    password?: string;
    passwordConfirm?: string;
    nickname?: string;
    agreement?: string;
    isMarketingAgreed?: string;
    isEmailVerified?: string;
  };
  message?: string;
};

export type EmailVerificationStatus = {
  showVerification: boolean;
  isVerified: boolean;
};

export async function signup(data: SignupSchemaType): Promise<SignupState> {
  console.log('signup action');

  try {
    console.log(data);
    return {
      message: '회원가입 성공',
    };
  } catch {
    return {
      message: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
}

export async function verifyEmailCode(
  code: string
): Promise<EmailVerificationStatus> {
  console.log('verifyEmailCode action');

  try {
    console.log(code);
    return {
      showVerification: false,
      isVerified: true,
    };
  } catch {
    return {
      showVerification: true,
      isVerified: false,
    };
  }
}

export async function sendEmailCode() {}
