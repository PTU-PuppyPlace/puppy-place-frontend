"use client";

import React from "react";
import Image from "next/image";
import loginLogo from "./login-logo.png";
import kakaoButton from "./kakao-button.png";
import appleButton from "./apple-button.png";
import googleButton from "./google-button.png";
import styled from "styled-components";
import Spacer from "@/components/common/Spacer";
import Link from "next/link";

const Login = () => {
  return (
    <Section>
      <Image src={loginLogo} alt="login logo" />
      <Spacer height={"60px"} />
      <ButtonSection>
        <Image src={kakaoButton} alt="kakao login button" />
        <Image src={appleButton} alt="apple login button" />
        <Image src={googleButton} alt="google login button" />
      </ButtonSection>
      <Spacer height={"24px"} />
      <StyledLink href="/login/email">이메일로 시작하기</StyledLink>
    </Section>
  );
};

export default Login;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.gray.g100};
  font-size: ${({ theme }) => theme.body14};
  font-weight: ${({ theme }) => theme.medium};
  cursor: pointer;
`;
