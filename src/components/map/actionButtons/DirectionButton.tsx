import NavigationIcon from '@/components/icons/navigation-maps-arrow-location-map-direction.svg';
import { ActionButton, ActionText } from './ActionButtons';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { NAVER_DIRECTION_URL } from '@/constants/map';
import { KAKAO_DIRECTION_URL } from '@/constants/map';
import { useMapContext } from '@/app/main/map/_context/MapContext';
export default function DirectionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedLocation } = useMapContext();

  const handleNavigationClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNaverMapClick = () => {
    if (!selectedLocation) return;
    window.open(
      NAVER_DIRECTION_URL(
        selectedLocation?.coordinates[0],
        selectedLocation?.coordinates[1],
        selectedLocation?.name,
        selectedLocation?.id
      ),
      '_blank'
    );
  };

  const handleKakaoMapClick = () => {
    window.open(KAKAO_DIRECTION_URL, '_blank');
  };
  return (
    <>
      <ActionButton onClick={handleNavigationClick}>
        <NavigationIcon width='24' height='24' />
        <ActionText>길찾기</ActionText>
      </ActionButton>
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>길찾기</ModalTitle>
            <ModalContent>
              <Button onClick={handleNaverMapClick}>네이버 지도</Button>
              <Button onClick={handleKakaoMapClick}>카카오맵 지도</Button>
            </ModalContent>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
}

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
