import React from 'react';
import styled from 'styled-components';

interface DividerProps {
  type?: string;
}

const Divider: React.FC<DividerProps> = ({ type }) => {
  return <StyledDivider type={type} />;
};

const StyledDivider = styled.div<{ type?: string }>`
  width: 100%;
  height: ${({ type }) => (type === 'thin' ? '1px' : '8px')};
  background-color: ${({ theme, type }) =>
    type === 'thin' ? theme.gray.g10 : theme.gray.g4};
  margin: ${({ theme }) => theme.dividerMargin} 0;
`;

export default Divider;
