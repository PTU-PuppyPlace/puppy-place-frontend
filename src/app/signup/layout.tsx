'use client';

import FormLayout from '@/components/layout/FormLayout';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <FormLayout
      onGoBack={() => {
        router.push('/login/email');
      }}
      headerText='회원가입'
    >
      {children}
    </FormLayout>
  );
}
