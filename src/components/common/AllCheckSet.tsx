'use client';

import styled from 'styled-components';
import React, { ReactNode, useEffect, useRef } from 'react';
import { Checkbox, CheckMark } from './CheckControl';

//전체동의 체크박스와 체크마크 세트들
export const AllCheckSet = ({
  checkItems,
}: {
  checkItems:
    | {
        text: string;
        sibling?: ReactNode;
      }[]
    | string[];
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [checkboxes, setCheckboxes] = React.useState<HTMLInputElement[]>([]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const checkboxes = wrapperRef.current.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    setCheckboxes(Array.from(checkboxes));
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!wrapperRef.current) return;

    // 전체선택 체크박스를 제외한 나머지 체크박스들의 상태를 변경합니다
    checkboxes.forEach((checkbox) => {
      if (checkbox !== e.target) {
        // 전체선택 체크박스 자신은 제외
        checkbox.checked = e.target.checked;
      }
    });
  };

  const handleItemChange = () => {
    const [mainCheckbox, ...otherCheckes] = checkboxes;
    const allChecked = Array.from(otherCheckes).every(
      (checkbox) => checkbox.checked
    );
    if (mainCheckbox) {
      mainCheckbox.checked = allChecked;
    }
  };

  return (
    <StyledField gap='12px' ref={wrapperRef}>
      <Checkbox onChange={handleSelectAll}>전체 동의</Checkbox>
      {checkItems.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <SmallCheckControl
              onChange={handleItemChange}
              key={index}
              text={item}
            />
          );
        } else {
          return (
            <SmallCheckControl
              key={index}
              onChange={handleItemChange}
              {...item}
            />
          );
        }
      })}
    </StyledField>
  );
};

const SmallCheckControl = ({
  text,
  sibling,
  ...rest
}: {
  text: string;
  sibling?: ReactNode;
  onChange: () => void;
}) => {
  return (
    <SmallCheckWrapper>
      <CheckMark {...rest}>{text}</CheckMark>
      {sibling}
    </SmallCheckWrapper>
  );
};

const StyledField = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap || '8px'};
  width: 100%;
`;

const SmallCheckWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.gray.g60};
  height: 20px;
`;
