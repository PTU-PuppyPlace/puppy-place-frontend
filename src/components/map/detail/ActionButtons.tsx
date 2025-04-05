import PhoneIcon from '@/components/icons/phones-phone-call.svg';
import NavigationIcon from '@/components/icons/navigation-maps-arrow-location-map-direction.svg';
import ShareIcon from '@/components/icons/interface-share.svg';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { useState } from 'react';

export default function ActionButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigationClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <ActionButton>
        <PhoneIcon width='24' height='24' />
        <ActionText>전화</ActionText>
      </ActionButton>
      <ActionButton onClick={handleNavigationClick}>
        <NavigationIcon width='24' height='24' />
        <ActionText>길찾기</ActionText>
      </ActionButton>
      <ActionButton>
        <ShareIcon width='24' height='24' />
        <ActionText>장소 공유</ActionText>
      </ActionButton>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>길찾기</ModalTitle>
            <ModalContent>
              <Button onClick={closeModal}>네이버 지도</Button>
              <Button onClick={closeModal}>카카오맵 지도</Button>
            </ModalContent>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </Modal>
        </ModalOverlay>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: stretch; // 각 버튼이 공간 차지하도록
  align-items: stretch;
  padding: 12px 0;
`;

const ActionButton = styled.button`
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

const ActionText = styled.span`
  font-size: ${({ theme }) =>
    theme.caption13}; // 피그마 caption13 (13px medium)
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g100};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 80%;
  max-width: 320px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.bold};
  text-align: center;
  margin: 0;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CloseButton = styled.button`
  background-color: ${({ theme }) => theme.gray.g10};
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-weight: ${({ theme }) => theme.medium};
  cursor: pointer;
`;
