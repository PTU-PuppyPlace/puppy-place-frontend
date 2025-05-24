import PhoneIcon from '@/components/icons/phones-phone-call.svg';
import ShareIcon from '@/components/icons/interface-share.svg';
import styled from 'styled-components';
import DirectionButton from './DirectionButton';
import toast from 'react-hot-toast';

export default function ActionButtons() {
  const shareURL = async () => {
    const title = '무무 애견카페';
    const url = window.location.href;
    const text = '귀여운 강아지가 있는 무무 애견카페를 확인해보세요!';

    try {
      await navigator.clipboard.writeText(url);
      toast.success('URL이 클립보드에 복사되었습니다.');
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
      }
    } catch (error) {
      console.error('공유 실패:', error);
    }
  };

  return (
    <Wrapper>
      <ActionButton>
        <PhoneIcon width='24' height='24' />
        <ActionText>전화</ActionText>
      </ActionButton>
      <DirectionButton />
      <ActionButton onClick={shareURL}>
        <ShareIcon width='24' height='24' />
        <ActionText>장소 공유</ActionText>
      </ActionButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: stretch; // 각 버튼이 공간 차지하도록
  align-items: stretch;
  padding: 12px 0;
`;

export const ActionButton = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: transparent;
  border: none;
  border-right: 1px solid ${({ theme }) => theme.gray.g10}; // 피그마 구분선
  &:last-child {
    border-right: none;
  }
  cursor: pointer;
  padding: 12px 0;
  color: ${({ theme }) => theme.gray.g100};

  svg {
    width: 24px;
    height: 24px;
    stroke: ${({ theme }) => theme.gray.g100}; // 피그마 아이콘 색상
    stroke-width: 1.5;
    fill: none;
  }
`;

export const ActionText = styled.span`
  font-size: ${({ theme }) =>
    theme.caption13}; // 피그마 caption13 (13px medium)
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g100};
`;
