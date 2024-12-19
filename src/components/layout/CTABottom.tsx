'use client';

import styled from 'styled-components';
import usePortal from '@/hooks/usePortal';

interface CTABottomProps extends React.HTMLAttributes<HTMLDivElement> {
  widthRatio?: 'full' | 'half' | 'quarter';
}

export default function CTABottom({
  children,
  widthRatio = 'full',
}: CTABottomProps) {
  return usePortal(
    <StyledCTABottom>
      <ContentWrapper $widthRatio={widthRatio}>{children}</ContentWrapper>
    </StyledCTABottom>,
    'layoutWrapper'
  );
}

const StyledCTABottom = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  bottom: 0;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 20%
  );
  padding-top: 24px; // Adjust this value to control how much of the gradient is visible
`;

const ContentWrapper = styled.div<{ $widthRatio?: string }>`
  display: flex;
  justify-content: stretch;
  align-items: ${({ $widthRatio }) =>
    $widthRatio === 'full' ? 'stretch' : 'center'};
  gap: 12px;
  padding: 16px 20px;
  padding-top: 0;
  background-color: ${({ theme }) => theme.extraWhite};
  flex-direction: ${({ $widthRatio }) =>
    $widthRatio === 'full' ? 'column' : 'row'};
  & > *:first-child {
    flex: ${({ $widthRatio }) => {
      switch ($widthRatio) {
        case 'half':
          return 0.5;
        case 'quarter':
          return 0.3;
        default:
          return '';
      }
    }};
  }
  & > *:last-child {
    flex: ${({ $widthRatio }) => {
      switch ($widthRatio) {
        case 'half':
          return 0.5;
        case 'quarter':
          return 0.7;
        default:
          return '';
      }
    }};
  }
`;
