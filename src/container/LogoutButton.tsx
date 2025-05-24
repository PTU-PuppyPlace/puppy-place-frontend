'use client';

import Button from '@/components/common/Button';
import { logout } from '@/services/account';

export default function LogoutButton() {
  return <Button onClick={async () => await logout()}>로그아웃</Button>;
}
