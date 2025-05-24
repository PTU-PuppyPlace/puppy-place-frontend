'use client';

import styled from 'styled-components';
import LogoutButton from '@/container/LogoutButton';

export default function LogoutButtonWrapper() {
  return (
    <LogoutButtonContainer>
      <LogoutButton />
    </LogoutButtonContainer>
  );
}

const LogoutButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  padding: 0 20px;
`;
