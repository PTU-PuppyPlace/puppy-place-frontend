import styled from 'styled-components';

export const LoginButton = styled.button`
  border-radius: 12px;
  width: 335px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  line-height: 25.5px;
  gap: 5px;
  font-weight: 500;
  cursor: pointer;
  border: none;
`;

export const KakaoButton = styled(LoginButton)`
  background-color: #fee500;
`;

export const AppleButton = styled(LoginButton)`
  background-color: ${({ theme }) => theme.gray.g100};
  color: ${({ theme }) => theme.extraWhite};
`;

export const GoogleButton = styled(LoginButton)`
  background-color: ${({ theme }) => theme.extraWhite};
  border-color: ${({ theme }) => theme.gray.g20};
  border-width: 1px;
  border-style: solid;
  color: ${({ theme }) => theme.gray.g100};
`;
