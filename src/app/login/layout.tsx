"use client";

import Header from "@/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        onGoBack={() => {
          console.log("고 백");
        }}
      >
        헤더
      </Header>
      <div>{children}</div>
    </>
  );
}
