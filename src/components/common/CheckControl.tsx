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

export const Checkbox: React.FC<CheckControlProps> = ({
  checked,
  onChange,
  disabled,
  children,
}) => (
  <Label disabled={disabled}>
    <HiddenControlbox
      type='checkbox'
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <ControlBox checked={checked} disabled={disabled} type='checkbox' />
    {children}
  </Label>
);

// 라디오 버튼 컴포넌트
export const RadioButton: React.FC<CheckControlProps> = ({
  checked,
  onChange,
  disabled,
  name,
  value,
  children,
}) => (
  <Label disabled={disabled}>
    <HiddenControlbox
      type='radio'
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <ControlBox checked={checked} disabled={disabled} type='radio' />
    {children}
  </Label>
);

const CheckIcon: React.FC<{ checked: boolean; disabled: boolean }> = ({
  checked,
  disabled,
}) => {
  const fillColor = disabled
    ? checked
      ? `${theme.primary.p20}`
      : `${theme.defaultButton}`
    : checked
    ? `${theme.primary.p100}`
    : `${theme.gray.g20}`;

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
  padding-left: 24px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  ${({ disabled }) => disabled && 'opacity: 0.4;'}
`;

const HiddenControlbox = styled.input.attrs({ type: 'checkbox' })`
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

const ControlBox = styled(CheckIcon)<{
  checked: boolean;
  disabled?: boolean;
  type: string;
}>`
  width: 24px;
  height: 24px;
  border: 1px solid #d1d5db; // 그레이 색상 테두리
  border-radius: ${({ type }) =>
    type === 'checkbox'
      ? '4px'
      : '50%'}; // 이미지에 표시된 대로 약간의 둥근 모서리를 적용합니다.
  background: ${({ checked }) =>
    checked
      ? '#4F46E5'
      : 'transparent'}; // 체크 여부에 따라 배경색을 적용합니다.
  color: #fff; // 체크박스 내 체크 표시 색상
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    `opacity: 0.4; pointer-events: none;`}; // 비활성화 상태 스타일링
  // 체크박스의 체크 표시를 위해 '::after' 의사 요소를 사용합니다.
  &::after {
    content: '${({ checked }) =>
      checked ? '✓' : ''}'; // 체크가 되면 체크 표시를 보여줍니다.
    font-size: 16px;
  }
`;
