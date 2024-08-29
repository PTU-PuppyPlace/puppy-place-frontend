"use client";

import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <Main>
      <StyleLink href="/login">로그인 페이지로 이동</StyleLink>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
  min-height: 100vh;
`;

const StyleLink = styled(Link)`
  background-color: ${({ theme }) => theme.gray.g10};
  padding: 10px;
  border-radius: 10px;
`;
