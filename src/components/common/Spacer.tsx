'use client';

import styled from 'styled-components';

export default function Spacer({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return <StyledSpacer width={width} height={height} />;
}

const StyledSpacer = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
`;
