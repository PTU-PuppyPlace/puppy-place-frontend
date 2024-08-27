import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

type TextAreaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  errorText?: string;
};

const TextArea = (props: TextAreaProps) => {
  const { errorText, ...rest } = props;
  return (
    <TextAreaWrapper>
      <StyledTextArea {...rest} $isError={!!errorText} />
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </TextAreaWrapper>
  );
};

export default TextArea;

const StyledTextArea = styled.textarea<{ $isError?: boolean }>`
  width: 335px;
  height: 124px;
  border-radius: 8px;
  background-color: ${theme.extraWhite};
  border: 1px solid
    ${({ $isError }) =>
      $isError ? `${theme.danger.d100}` : `${theme.gray.g20}`};
  padding: 12px 16px;
  color: ${theme.gray.g100};
  &::placeholder {
    color: ${theme.gray.g40};
  }
  &:focus {
    border: 1px solid ${theme.primary.p100};
  }
  &:disabled {
    border: 1px solid ${theme.gray.g20};
    background-color: ${theme.background};
  }
`;

const ErrorText = styled.div`
  color: ${theme.danger.d100};
  font-size: ${theme.caption12};
`;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
