'use client';
import { useRouter } from 'next/navigation';

export default function Page({ phase }: { phase?: string }) {
  const router = useRouter();
  if (!phase) {
    router.push('/find-password/1');
  }
}
