'use client';

import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import CalendarIcon from '@/components/icons/calendar.svg';

interface DatePickerProps {
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  errorText?: string;
  name: string;
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { errorText, defaultValue, ...rest } = props;
  const calendarRef = React.useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = React.useState(defaultValue || '');

  const openCalendar = () => {
    if (calendarRef.current) {
      calendarRef.current.showPicker();
    }
  };

  const handleCalendarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(event.target.value);
  };

  return (
    <DatePickerWrapper>
      <DateInputSection>
        <Input
          {...rest}
          type='text'
          readOnly
          onClick={openCalendar}
          $isError={!!errorText}
          value={displayValue}
          placeholder={props.placeholder}
        />
        <CalendarBtn disabled={props.disabled} onClick={openCalendar} />
        <CalendarInput
          ref={calendarRef}
          type='date'
          name={props.name}
          defaultValue={defaultValue}
          onChange={handleCalendarChange}
        />
      </DateInputSection>
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </DatePickerWrapper>
  );
};

const DateInputSection = styled.div`
  position: relative;
  display: inline-block;
`;

const Input = styled.input<{ $isError?: boolean }>`
  width: 335px;
  height: 40px;
  border-radius: 8px;
  padding: 12px 12px 12px 16px;
  border: 1px solid
    ${({ $isError }) => ($isError ? theme.danger.d100 : theme.gray.g20)};
  cursor: pointer;
  color: ${theme.gray.g100};
  &::placeholder {
    color: ${theme.gray.g60};
  }
  &:disabled {
    background-color: ${theme.background};
    color: ${theme.gray.g40};
    cursor: not-allowed;
  }
`;

const CalendarBtn = styled(CalendarIcon)`
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  &:disabled {
    cursor: not-allowed;
  }
`;

const CalendarInput = styled.input`
  position: absolute;
  top: 100%;
  left: 0;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  opacity: 0.01;
`;

const ErrorText = styled.div`
  color: ${theme.danger.d100};
  font-size: ${theme.caption12};
`;

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
