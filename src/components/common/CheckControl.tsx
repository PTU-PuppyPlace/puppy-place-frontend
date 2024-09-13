import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface CheckControlProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
  children?: React.ReactNode;
}

// 체크 마크 컴포넌트
export const CheckMark: React.FC<CheckControlProps> = ({
  checked,
  onChange,
  disabled,
  name,
  value,
  children,
}) => (
  <Label disabled={disabled}>
    <HiddenCheck
      type='checkbox'
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <CheckMarkWrapper checked={checked} disabled={disabled} type='mark' />
    {children}
  </Label>
);

// 체크 박스 컴포넌트
export const Checkbox: React.FC<CheckControlProps> = ({
  checked,
  onChange,
  disabled,
  name,
  value,
  children,
}) => (
  <Label disabled={disabled}>
    <HiddenCheck
      type='checkbox'
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <BoxWrapper checked={checked} disabled={disabled}>
      <CheckMarkWrapper checked={checked} disabled={disabled} type='box' />
    </BoxWrapper>
    {children}
  </Label>
);

// 공통 아이콘
const CheckIcon: React.FC<{
  checked: boolean;
  disabled: boolean;
  type: string;
}> = ({ checked, disabled, type }) => {
  let fillColor = `${theme.primary.p20}`;

  if (type === 'mark') {
    fillColor = disabled
      ? checked
        ? `${theme.primary.p20}`
        : `${theme.defaultButton}`
      : checked
      ? `${theme.primary.p100}`
      : `${theme.gray.g20}`;
  }

  if (type === 'box') {
    fillColor = '#fff';
  }

  return (
    <svg
      width='15'
      height='12'
      viewBox='0 0 15 12'
      fill={fillColor}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        color={fillColor}
        d='M14.4053 1.17707C14.7958 1.56755 14.7959 2.20071 14.4054 2.59128L6.17562 10.8228C5.98809 11.0104 5.73373 11.1158 5.4685 11.1158C5.20326 11.1158 4.94889 11.0104 4.76134 10.8229L0.991135 7.05267C0.600611 6.66215 0.600611 6.02898 0.991135 5.63846C1.38166 5.24793 2.01482 5.24793 2.40535 5.63846L5.46837 8.70148L12.9911 1.17721C13.3815 0.786649 14.0147 0.786583 14.4053 1.17707Z'
      />
    </svg>
  );
};

const Label = styled.label<{ disabled?: boolean }>`
  position: relative;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  ${({ disabled }) => disabled && 'opacity: 0.4;'}
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HiddenCheck = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const CheckMarkWrapper = styled(CheckIcon)<{
  checked: boolean;
  disabled?: boolean;
  type: string;
}>`
  width: 24px;
  height: 24px;
  border: 1px solid #d1d5db;
  background: ${({ checked }) => (checked ? '#4F46E5' : 'transparent')};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ disabled }) => disabled && `opacity: 0.4; pointer-events: none;`};
  &::after {
    content: '${({ checked }) => (checked ? '✓' : '')}';
    font-size: 16px;
  }
`;

const BoxWrapper = styled.div<{ disabled?: boolean; checked: boolean }>`
  display: inline-block;
  border-radius: 2px;
  padding: 2px 1px 1px;
  width: fit-content;
  border: 1px solid
    ${({ disabled, checked }) =>
      disabled
        ? checked
          ? `${theme.primary.p30}`
          : `${theme.defaultButton}`
        : checked
        ? `${theme.primary.p100}`
        : `${theme.gray.g20}`};
  background-color: ${({ disabled, checked }) =>
    disabled
      ? checked
        ? `${theme.primary.p30}`
        : `${theme.defaultButton}`
      : checked
      ? `${theme.primary.p100}`
      : `${theme.gray.g20}`};
`;
