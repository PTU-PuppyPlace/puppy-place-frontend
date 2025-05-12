import { useState, useRef } from 'react';
import styled from 'styled-components';
import { useController } from 'react-hook-form';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import DogIcon from '@/components/icons/pets-animals-dog-2.svg';
import PlusIcon from '@/components/icons/interface-plus-add.svg';
import theme from '@/styles/theme';

interface FileAvatarProps {
  control: any;
  name: string;
  onChange?: (file: File) => void;
  size: number;
}

export default function FileAvatar({
  control,
  name,
  onChange,
  size = 80,
}: FileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { field } = useController({
    name,
    control,
    defaultValue: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL for the image
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Update the form field value
    field.onChange(file);

    // Call the optional onChange callback
    if (onChange) {
      onChange(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <AvatarContainer onClick={handleAvatarClick}>
      <StyledAvatar $size={size}>
        {previewUrl && (
          <AvatarImage src={previewUrl} alt='Avatar' className='object-cover' />
        )}
        <AvatarFallback className='bg-gray-100'>
          <DogIcon
            style={{ width: '56px', height: '56px', stroke: theme.gray.g40 }}
          />
        </AvatarFallback>
      </StyledAvatar>

      <PlusButton>
        <PlusIcon />
      </PlusButton>

      <HiddenInput
        type='file'
        ref={fileInputRef}
        accept='image/*'
        onChange={handleFileChange}
      />
    </AvatarContainer>
  );
}

// Styled components for custom styling
const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const PlusButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  cursor: pointer;
  border: none;

  svg {
    stroke: white;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const StyledAvatar = styled(Avatar)<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border: 1px solid #e2e8f0;
`;
