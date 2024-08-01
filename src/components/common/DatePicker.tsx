import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

interface DatePickerProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  min?: string;
  max?: string;
  errorText?: string;
}

// 달력 컴포넌트
export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { errorText, ...rest } = props;
  const ref = React.useRef<HTMLInputElement>(null);

  const openCalendar = () => {
    if (ref.current) {
      ref.current.showPicker();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event);
  };

  return (
    <DatePickerWrapper>
      <Wrapper>
        <Input
          {...rest}
          type="text"
          readOnly
          onClick={openCalendar}
          $isError={!!errorText}
        />
        {/* TODO: icon 디자인 시스템 머지되면 캘린더 아이콘으로 변경하기 */}
        <Button id="calendar-button" disabled={props.disabled}>
          📅
        </Button>
        <CalendarInput ref={ref} type="date" onChange={handleChange} />
      </Wrapper>
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </DatePickerWrapper>
  );
};

const Wrapper = styled.div`
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
  position: relative;
  &::placeholder {
    color: ${theme.gray.g60};
  }
  &:disabled {
    background-color: ${theme.background};
    color: ${theme.gray.g40};
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 16px;
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
