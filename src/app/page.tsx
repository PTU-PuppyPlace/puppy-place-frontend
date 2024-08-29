"use client";

import styles from "./page.module.css";
import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <main className={styles.main}>
      <StyleLink href="/login">로그인 페이지로 이동</StyleLink>
    </main>
  );
}

const StyleLink = styled(Link)`
  background-color: ${({ theme }) => theme.gray.g10};
  padding: 10px;
  border-radius: 10px;
`;
