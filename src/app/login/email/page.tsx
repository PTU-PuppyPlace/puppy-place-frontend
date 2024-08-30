"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import TextField from "@/components/common/TextField";
import { Checkbox } from "@/components/common/CheckControl";
import Button from "@/components/common/Button";

const Login = () => {
  return (
    <Section>
      <TextField placeholder="아이디(이메일)" onChange={() => {}} value="" />
      <TextField placeholder="비밀번호" onChange={() => {}} value="" />
      <Checkbox checked={false} onChange={() => {}}>
        자동로그인
      </Checkbox>
      <Button onClick={() => {}} variant="primary" size="52">
        로그인
      </Button>
      <Link href="/login/find-password">비밀번호 찾기</Link>
      <Link href="/login/signup">회원가입</Link>
    </Section>
  );
};

export default Login;

const Section = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;
