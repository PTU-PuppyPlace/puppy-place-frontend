import React from 'react';
import styled from 'styled-components';

interface DividerProps {
  className?: string;
}

const StyledDivider = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.gray.g4};
  margin: 16px 0;
`;

const Divider: React.FC<DividerProps> = ({ className }) => {
  return <StyledDivider className={className} />;
};

export default Divider;
