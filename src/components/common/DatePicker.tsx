'use client';

import React from 'react';
import CalendarIcon from '@/components/icons/calendar.svg';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import styled from 'styled-components';
import Button from './Button';
import ErrorText from './ErrorText';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import theme from '@/styles/theme';

interface DatePickerProps {
  defaultValue?: Date;
  placeholder?: string;
  errorText?: string;
  name: string;
  reactHookForm?: {
    setValue: UseFormSetValue<any>;
    trigger: UseFormTrigger<any>;
    name: string;
  };
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { errorText, defaultValue, placeholder, reactHookForm } = props;
  const [date, setDate] = React.useState<Date | undefined>(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <DatePickerWrapper>
        <Button
          type='button'
          variant={errorText ? 'danger-outline' : 'outline'}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            justifyContent: 'space-between',
            padding: '12px 16px',
            fontSize: theme.body16,
            borderRadius: '8px',
            height: '40px',
          }}
        >
          {date ? (
            format(date, 'yyyy.M.d')
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}
          <CalendarIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        {isOpen && (
          <CalendarWrapper>
            <Calendar
              mode='single'
              selected={date}
              onSelect={(day) => {
                setDate(day);
                setIsOpen(false);
                if (reactHookForm) {
                  const { setValue, trigger, name } = reactHookForm;
                  setValue(name, day);
                  trigger(name);
                }
              }}
              initialFocus
            />
          </CalendarWrapper>
        )}
      </DatePickerWrapper>
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </>
  );
};

const DatePickerWrapper = styled.div`
  position: relative;
`;

const CalendarWrapper = styled.div`
  width: auto;
  position: absolute;
  top: 32px;
  left: 0;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const Placeholder = styled.span`
  color: ${theme.gray.g40};
`;
