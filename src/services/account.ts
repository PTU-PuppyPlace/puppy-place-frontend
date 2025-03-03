'use server';

import { IErrorResponse } from '@/types/services';
import { apiClient } from './apiClient';
import { signOut } from '@/auth';

const registerUrl = '/account/member/register/process';
const createVerificationUrl = '/account/verification/create';
const confirmVerificationUrl = '/account/verification/confirm';
const checkNicknameUrl = '/account/member/register/check/nickname';
const registerCheckUrl = '/account/member/register/init';
const loginUrl = '/account/auth/credential';

interface ISendEmailCodeResponse extends IErrorResponse {
  isSuccess: boolean;
  message: string;
  createdAt: string;
  expiresAt: string;
}

// 회원가입
export async function signup(data: any) {
  return await apiClient.post(registerUrl, data);
}

//이메일 인증코드 전송
export async function sendEmailCode(
  email: string
): Promise<ISendEmailCodeResponse> {
  return await apiClient.post(createVerificationUrl, {
    email,
  });
}

//이메일 인증코드 확인
export async function checkEmailCode(email: string, authCode: string) {
  return await apiClient.post(confirmVerificationUrl, {
    email,
    authCode,
  });
}

// 닉네임 중복 확인
export async function checkNickname(nickname: string) {
  const result = await apiClient.post(checkNicknameUrl, {
    nickname,
  });
  if (result.isDuplicated) {
    return {
      isSuccess: false,
      message: '이미 사용 중인 닉네임입니다.',
    };
  } else {
    return result;
  }
}

// 회원가입한 사용자인지 확인
export async function checkUser(username: string, authCode: string) {
  return await apiClient.post(registerCheckUrl, {
    username,
    authCode,
  });
}

// 로그인
export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const result = await apiClient.post(loginUrl, {
    username,
    password,
  });
  if (result.isSuccess) {
    return { ...result, username };
  } else {
    return result;
  }
}

export async function logout() {
  await signOut({ redirectTo: '/login' });
}
