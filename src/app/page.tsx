'use client';

import Link from 'next/link';
import styled from 'styled-components';

export default function Home() {
  return (
    <>
      <StyleLink href='/login'>로그인 페이지로 이동</StyleLink>
      <StyleLink href='/sample'>컴포넌트 테스트 페이지로 이동</StyleLink>
    </>
  );
}

const StyleLink = styled(Link)`
  background-color: ${({ theme }) => theme.gray.g10};
  padding: 10px;
  border-radius: 10px;
`;
