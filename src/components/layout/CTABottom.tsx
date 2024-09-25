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
    <StyledCTABottom $widthRatio={widthRatio}>{children}</StyledCTABottom>,
    'layoutWrapper'
  );
}

const StyledCTABottom = styled.div<{ $widthRatio?: string }>`
  display: flex;
  justify-content: stretch;
  align-items: ${({ $widthRatio }) =>
    $widthRatio === 'full' ? 'stretch' : 'center'};
  gap: 12px;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.extraWhite};
  position: sticky;
  bottom: 0;
  width: 100%;
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
