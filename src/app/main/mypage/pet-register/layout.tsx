'use client';

import FormLayout from '@/components/layout/FormLayout';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <FormLayout
      onGoBack={() => {
        router.push('/main/mypage');
      }}
      headerText='반려동물 정보 입력'
    >
      {children}
    </FormLayout>
  );
}
