'use server';

import { IErrorResponse } from '@/types/services';
import { apiClient, HTTPError } from './apiClient';

const registerUrl = '/account/member/register/process';
const createVerificationUrl = '/account/verification/create';
const confirmVerificationUrl = '/account/verification/confirm';
const checkNicknameUrl = '/account/member/register/check/nickname';
const registerCheckUrl = '/account/member/register/init';

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

interface ISendEmailCodeResponse extends IErrorResponse {
  isSuccess: boolean;
  message: string;
  createdAt: string;
  expiresAt: string;
}
