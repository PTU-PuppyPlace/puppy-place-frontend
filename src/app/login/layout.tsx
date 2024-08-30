"use client";

import Header from "@/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        onExit={() => {
          console.log("나가기");
        }}
      >
        이메일로 시작하기
      </Header>
      {children}
    </>
  );
}
