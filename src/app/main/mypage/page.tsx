import { getUserProfile } from './_components/UserProfile';
import MypageClient from './MypageClient';
import { redirect } from 'next/navigation';

export default async function Mypage() {
  // 서버 컴포넌트에서 사용자 프로필 데이터 가져오기
  const userProfileData = await getUserProfile();

  if (!userProfileData?.profile) {
    return redirect('/login');
  }

  // 클라이언트 컴포넌트에 데이터 전달
  return <MypageClient userProfile={userProfileData.profile} />;
}
