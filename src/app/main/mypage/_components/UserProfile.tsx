import { getMyProfile } from '@/services/user';
import { auth } from '@/auth';

export async function getUserProfile() {
  // 사용자 인증 정보 가져오기
  const session = await auth();

  if (!session || !session.user) {
    return {
      isAuthenticated: false,
      profile: null,
    };
  }

  // 사용자 프로필 데이터 가져오기
  const userProfile = await getMyProfile();

  return {
    isAuthenticated: true,
    profile: {
      nickname: userProfile.isSuccess ? userProfile.nickname : '사용자',
      loginMethod: userProfile.loginMethod || '이메일',
    },
  };
}
