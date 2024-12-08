'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import NavigationDown from '@/components/icons/navigation-down.svg';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  errorText?: string;
  disabled?: boolean;
  selectedValue?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = '선택',
  onChange,
  errorText,
  disabled,
  selectedValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (selectedValue) {
      const option = options.find((option) => option.value === selectedValue);
      setSelectedOption(option || null);
    }
  }, [selectedValue, options]);

  return (
    <SelectContainer ref={selectRef}>
      <SelectButton
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        $hasError={!!errorText}
        disabled={disabled}
      >
        {selectedOption ? (
          <SelectedLabel>{selectedOption.label}</SelectedLabel>
        ) : (
          <Placeholder disabled={disabled}>{placeholder}</Placeholder>
        )}
        <NavigationDown width='20' height='20' />
      </SelectButton>
      <OptionsList $isOpen={isOpen}>
        {options.map((option) => (
          <Option key={option.value} onClick={() => handleSelect(option)}>
            <OptionText>{option.label}</OptionText>
          </Option>
        ))}
      </OptionsList>
      {errorText && <ErrorMessage>{errorText}</ErrorMessage>}
    </SelectContainer>
  );
};

export default Select;

const SelectContainer = styled.div`
  position: relative;
`;

const SelectButton = styled.button<{
  $isOpen: boolean;
  $hasError: boolean;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 335px;
  height: 40px;
  padding: 12px 12px 12px 16px;
  background-color: ${theme.extraWhite};
  border: 1px solid
    ${(props) => (props.$hasError ? theme.danger.d100 : theme.gray.g03)};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: ${theme.body16};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${(props) =>
    props.$isOpen &&
    `
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}

  ${({ disabled }) =>
    disabled &&
    `
    background-color: ${theme.background};
    cursor: not-allowed;

    `}
`;

const OptionsList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  background-color: ${theme.extraWhite};
  width: 335px;
  border: 1px solid ${theme.gray.g03};
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 10;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled.li`
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${theme.gray.g100};

  &:hover {
    background-color: ${theme.gray.g03};
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.danger.d100};
  font-size: ${theme.caption12};
  margin-top: 8px;
`;

const SelectedLabel = styled.span`
  color: ${theme.gray.g100};
`;

const OptionText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Placeholder = styled.span<{ disabled?: boolean }>`
  color: ${({ disabled }) => (disabled ? theme.gray.g40 : theme.gray.g60)};
`;
