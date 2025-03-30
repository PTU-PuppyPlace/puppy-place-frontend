import { MapLocation } from '@/types/map';
import styled from 'styled-components';
import CloseIcon from '@/components/icons/navigation-close.svg';
import toast from 'react-hot-toast';

export default function AddressDetail({
  selectedLocation,
  closeAddressDetail,
}: {
  selectedLocation: MapLocation;
  closeAddressDetail: () => void;
}) {
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success('주소가 복사되었습니다.');
  };

  return (
    <Modal>
      <CloseButton onClick={closeAddressDetail}>
        <CloseIcon style={{ width: '20px', height: '20px' }} />
      </CloseButton>
      <AddressSection>
        <AddressLabel>도로명: </AddressLabel>
        <AddressText>{selectedLocation.address}</AddressText>
        <CopyButton onClick={() => handleCopy(selectedLocation.address)}>
          복사
        </CopyButton>
      </AddressSection>
      <AddressSection>
        <AddressLabel>지번: </AddressLabel>
        <AddressText>{selectedLocation.oldAddress}</AddressText>
        <CopyButton onClick={() => handleCopy(selectedLocation.oldAddress)}>
          복사
        </CopyButton>
      </AddressSection>
    </Modal>
  );
}

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.extraWhite};
  border: none;
  border-radius: 12px;
  padding: 10px;
  box-shadow: ${({ theme }) => theme.shadow1};
  z-index: 1;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const AddressSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AddressLabel = styled.span`
  font-size: ${({ theme }) => theme.body14};
  color: ${({ theme }) => theme.gray.g60};
`;

const AddressText = styled.span`
  font-size: ${({ theme }) => theme.body14};
  color: ${({ theme }) => theme.gray.g100};
`;

const CopyButton = styled.button`
  font-size: ${({ theme }) => theme.body14};
  color: ${({ theme }) => theme.primary.p100};
  background: transparent;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.medium};
`;
