import styled from 'styled-components';

export default function Label({ children }: { children: React.ReactNode }) {
  return <StyledLabel>{children}</StyledLabel>;
}

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.gray.g100};
  font-size: ${({ theme }) => theme.caption13};
  font-weight: ${({ theme }) => theme.medium};
`;
