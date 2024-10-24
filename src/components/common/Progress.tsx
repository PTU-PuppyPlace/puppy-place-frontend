import styled from 'styled-components';

export default function Progress({ phase }: { phase: number }) {
  return (
    <StyledProgress>
      <StyledProgressBar>
        <StyledProgressFill phase={phase} />
      </StyledProgressBar>
    </StyledProgress>
  );
}

const StyledProgress = styled.div`
  width: 100%;
`;

const StyledProgressBar = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.gray.g4};
  position: relative;
`;

const StyledProgressFill = styled.div<{ phase: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${({ phase }) => (phase / 3) * 100}%;
  background-color: ${({ theme }) => theme.primary.p100};
  transition: width 0.3s ease;
`;
