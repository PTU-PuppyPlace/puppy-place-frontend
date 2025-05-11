'use client';

import styled from 'styled-components';

interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
}

export default function Label({ children, required = false }: LabelProps) {
  return (
    <StyledLabel>
      {children}
      {required && <RequiredMark>*</RequiredMark>}
    </StyledLabel>
  );
}

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.gray.g100};
  font-size: ${({ theme }) => theme.caption13};
  font-weight: ${({ theme }) => theme.medium};
  display: flex;
  align-items: center;
`;

const RequiredMark = styled.span`
  color: ${({ theme }) => theme.danger.d100};
  margin-left: 2px;
`;
