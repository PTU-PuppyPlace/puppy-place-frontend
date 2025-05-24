import React from 'react';
import styled from 'styled-components';

interface DividerProps {
  type?: string;
  noMargin?: boolean;
}

const Divider: React.FC<DividerProps> = ({ type, noMargin = false }) => {
  return <StyledDivider type={type} noMargin={noMargin} />;
};

const StyledDivider = styled.div<{ type?: string; noMargin?: boolean }>`
  width: 100%;
  height: ${({ type }) => (type === 'thin' ? '1px' : '8px')};
  background-color: ${({ theme, type }) =>
    type === 'thin' ? theme.gray.g10 : theme.gray.g4};
  margin: ${({ theme, noMargin }) => (noMargin ? '0' : theme.dividerMargin)} 0;
`;

export default Divider;
