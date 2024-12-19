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
  name: string;
  placeholder?: string;
  errorText?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  name,
  placeholder = '선택',
  errorText,
  disabled,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(() => {
    if (defaultValue) {
      return options.find((option) => option.value === defaultValue) || null;
    }
    return null;
  });
  const selectRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLSelectElement>(null);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);

    // Hidden input에 선택된 option의 value를 설정하고 change 이벤트를 발생시킴.
    // formData를 사용하므로 hidden input을 사용하여 값을 전달함.
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = option.value;
      const event = new Event('change', { bubbles: true });
      hiddenInputRef.current.dispatchEvent(event);
    }
  };

  // Select 밖을 클릭하면 dropdown이 닫히게 하기 위한 로직
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

  return (
    <SelectContainer ref={selectRef}>
      <HiddenSelect
        ref={hiddenInputRef}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
      >
        <option value=''>선택</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </HiddenSelect>

      <SelectButton
        type='button'
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

const HiddenSelect = styled.select`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
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
