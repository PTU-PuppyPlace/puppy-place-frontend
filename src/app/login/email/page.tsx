"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Login = () => {
  return <div>로그임</div>;
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
