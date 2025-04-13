'use client';

import styled from 'styled-components';
import Divider from '@/components/common/Divider';
import Header from './_components/Header';
import UserInfo from './_components/UserInfo';
import PetSection from './_components/PetSection';
import VisitedCafesSection from './_components/VisitedCafesSection';
import LinkSection from './_components/LinkSection';
import LogoutButtonWrapper from './_components/LogoutButtonWrapper';
import { useRouter } from 'next/navigation';

interface UserProfileType {
  nickname: string;
  loginMethod: string;
}

interface MypageClientProps {
  userProfile: UserProfileType;
}

export default function MypageClient({ userProfile }: MypageClientProps) {
  const router = useRouter();

  // 이벤트 핸들러 구현
  const handleSettingsClick = () => {
    console.log('설정 버튼 클릭');
  };

  const handleRegisterPet = () => {
    router.push('/main/pet-register');
  };

  const handleSeeAllCafes = () => {
    console.log('방문 카페 전체보기 클릭');
  };

  const handleFriendsClick = () => {
    console.log('친구 관리 클릭');
  };

  const handleInquiriesClick = () => {
    console.log('문의 내역 클릭');
  };

  const handleRegisterPlaceClick = () => {
    console.log('장소 등록 클릭');
  };

  return (
    <Container>
      <Header onSettingsClick={handleSettingsClick} />

      <UserInfo
        userName={`${userProfile.nickname} 님`}
        loginMethod={userProfile.loginMethod}
      />

      <PetSection hasPets={false} onRegisterPet={handleRegisterPet} />

      <Divider type='thin' />

      <VisitedCafesSection cafes={[]} onSeeAll={handleSeeAllCafes} />

      <Divider type='thin' />

      <LinkSection title='친구 관리' onClick={handleFriendsClick} />

      <LinkSection title='문의 내역' onClick={handleInquiriesClick} />

      <LinkSection title='장소 등록' onClick={handleRegisterPlaceClick} />

      <LogoutButtonWrapper />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: ${({ theme }) => theme.extraWhite};
  padding-bottom: 80px;
`;
