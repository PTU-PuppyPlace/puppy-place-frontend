'use server';

// 사용자 정보 조회 API
export async function getMyProfile() {
  //TODO: 사용자 정보 조회 API 호출 연결
  return {
    isSuccess: true,
    nickname: '따따누나',
    loginMethod: '이메일',
  };
}
