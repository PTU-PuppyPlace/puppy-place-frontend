'use server';

import { IErrorResponse } from '@/types/services';
import { apiClient } from './apiClient';

export async function signup(data: any) {
  const response = await apiClient.post(
    '/account/member/register/process',
    data
  );
  return response;
}

export async function sendEmailCode(
  email: string
): Promise<ISendEmailCodeResponse> {
  const response = await apiClient.post('/account/verification/create', {
    email,
  });
  return response;
}

export async function checkEmailCode(email: string, authCode: string) {
  const response = await apiClient.post('/account/verification/confirm', {
    email,
    authCode,
  });
  return response;
}

// 닉네임 중복 확인
export async function checkNickname(nickname: string) {
  const response = await apiClient.post(
    '/account/member/register/check/nickname',
    {
      nickname,
    }
  );
  return response;
}

// 회원가입 전 사용자의 이름, 전화번호를 확인하여 회원가입한 사용자인지 확인
export async function checkUser(username: string, authCode: string) {
  const response = await apiClient.post('/account/member/register/init', {
    username,
    authCode,
  });
  return response;
}

interface ISendEmailCodeResponse extends IErrorResponse {
  message: string;
  createdAt: string;
  expiresAt: string;
}
