'use client';

import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface CheckControlProps {
  name?: string;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
  children?: React.ReactNode;
}

// 체크 마크 컴포넌트
export const CheckMark: React.FC<CheckControlProps> = ({
  defaultChecked,
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
      defaultChecked={defaultChecked}
      onChange={onChange}
      disabled={disabled}
    />
    <MarkWrapper>
      <CheckIcon />
    </MarkWrapper>
    {children}
  </Label>
);

// 체크 박스 컴포넌트
export const Checkbox: React.FC<CheckControlProps> = ({
  defaultChecked,
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
      defaultChecked={defaultChecked}
      onChange={onChange}
      disabled={disabled}
    />
    <BoxWrapper>
      <CheckIcon />
    </BoxWrapper>
    {children}
  </Label>
);

const CheckIcon = () => (
  <svg
    viewBox='0 0 15 12'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
    style={{ width: '15px', height: '12px', stroke: 'none' }}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M14.4053 1.17707C14.7958 1.56755 14.7959 2.20071 14.4054 2.59128L6.17562 10.8228C5.98809 11.0104 5.73373 11.1158 5.4685 11.1158C5.20326 11.1158 4.94889 11.0104 4.76134 10.8229L0.991135 7.05267C0.600611 6.66215 0.600611 6.02898 0.991135 5.63846C1.38166 5.24793 2.01482 5.24793 2.40535 5.63846L5.46837 8.70148L12.9911 1.17721C13.3815 0.786649 14.0147 0.786583 14.4053 1.17707Z'
    />
  </svg>
);

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

// 체크마크 래퍼 (배경 없는 버전)
const MarkWrapper = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 20px;
  height: 20px;
  color: ${theme.gray.g20};
  transition: all 0.2s;

  ${HiddenCheck}:checked + & {
    color: ${theme.primary.p100};
  }

  ${HiddenCheck}:checked:disabled + & {
    color: ${theme.primary.p30};
    pointer-events: none;
  }

  ${HiddenCheck}:disabled + & {
    color: ${theme.gray.g10};
    cursor: not-allowed;
    pointer-events: none;
  }
`;

// 박스 래퍼 (배경 있는 버전)
const BoxWrapper = styled.div`
  display: inline-block;
  border-radius: 2px;
  padding: 2px 1px 1px;
  width: 20px;
  height: 20px;
  border: 1px solid;
  border-color: ${theme.gray.g20};
  background-color: ${theme.gray.g20};
  transition: all 0.2s;
  color: #fff;

  ${HiddenCheck}:checked + & {
    background-color: ${theme.primary.p100};
    border-color: ${theme.primary.p100};
  }

  ${HiddenCheck}:checked:disabled + & {
    background-color: ${theme.primary.p30};
    border-color: ${theme.primary.p30};
  }

  ${HiddenCheck}:disabled + & {
    background-color: ${theme.gray.g10};
    cursor: not-allowed;
    border-color: ${theme.gray.g10};
  }
`;
