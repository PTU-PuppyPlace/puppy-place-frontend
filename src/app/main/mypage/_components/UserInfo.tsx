'use client';

import styled from 'styled-components';

interface UserInfoProps {
  userName: string;
  loginMethod: string;
}

export default function UserInfo({ userName, loginMethod }: UserInfoProps) {
  return (
    <UserInfoContainer>
      <UserName>{userName}</UserName>
      <UserLoginInfo>{loginMethod} 계정으로 이용중입니다.</UserLoginInfo>
    </UserInfoContainer>
  );
}

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 32px 20px 20px;
`;

const UserName = styled.div`
  font-size: ${({ theme }) => theme.body17};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
`;

const UserLoginInfo = styled.div`
  font-size: ${({ theme }) => theme.caption13};
  color: ${({ theme }) => theme.gray.g60};
`;
