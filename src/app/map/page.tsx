'use client';

import Button from '@/components/common/Button';
import BottomTabBar from '@/components/layout/BottomTabbar';
import { logout } from '@/services/account';

export default function Map() {
  return (
    <>
      맵 페이지
      <Button onClick={async () => await logout()}>로그아웃</Button>
      <BottomTabBar />
    </>
  );
}
