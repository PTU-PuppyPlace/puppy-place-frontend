'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import CheckIcon from '../../../public/check.svg';

type Options = { options: { text: string; icon?: boolean }[] };

const Segment = ({ options }: Options) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SegmentContainer>
      {options.map((option, index: number) => (
        <Button
          key={option.text}
          active={index === activeIndex}
          onClick={() => setActiveIndex(index)}
        >
          {option.icon && (
            <CheckIcon
              fill={index === activeIndex ? theme.primary.p100 : theme.gray.g40}
            />
          )}
          {option.text}
        </Button>
      ))}
    </SegmentContainer>
  );
};

export default Segment;

const SegmentContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.extraWhite};
  border: 1px solid ${({ theme }) => theme.gray.g20};
  border-radius: 8px;
  overflow: hidden;
`;

const Button = styled.button<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 10px 20px;
  background-color: ${({ active, theme }) =>
    active ? theme.primary.p20 : theme.extraWhite};
  border: 1px solid
    ${({ active, theme }) => (active ? theme.primary.p100 : theme.gray.g20)};
  color: ${({ active, theme }) =>
    active ? theme.primary.p100 : theme.gray.g40};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primary.p20};
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  // 마지막 버튼에 대한 특별한 스타일
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
