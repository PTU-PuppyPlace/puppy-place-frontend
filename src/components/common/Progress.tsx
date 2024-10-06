import styled from 'styled-components';

export default function Progress({ phase }: { phase: number }) {
  return (
    <StyledProgress>
      <StyledProgressItem active={phase >= 1} />
      <StyledProgressItem active={phase >= 2} />
      <StyledProgressItem active={phase >= 3} />
    </StyledProgress>
  );
}

const StyledProgress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const StyledProgressItem = styled.div<{ active: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ active, theme }) =>
    active ? `${theme.primary.p100}` : `${theme.gray.g20}`};
`;
