import styled from "styled-components";
import theme from "@/styles/theme";

interface TextFieldProps {
  placeholder?: string;
  errorText?: string;
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = (props: TextFieldProps) => {
  const { errorText, ...rest } = props;
  return (
    <TextFieldWrapper>
      <StyledTextField {...rest} $isError={!!errorText} />
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </TextFieldWrapper>
  );
};

export default TextField;

const StyledTextField = styled.input<{ $isError?: boolean }>`
  width: 335px;
  height: 40px;
  border: none;
  outline: none;
  border-bottom: 1px solid
    ${({ $isError }) =>
      $isError ? `${theme.danger.d100}` : `${theme.gray.g20}`};
  color: ${theme.gray.g100};
  &::placeholder {
    color: ${theme.gray.g40};
  }
  &:focus {
    border-bottom: 1px solid ${theme.primary.p100};
  }
  &:disabled {
    border-bottom: 1px solid ${theme.gray.g20};
    background-color: ${theme.background};
    &::placeholder {
      padding: 0 8px;
    }
  }
`;

const ErrorText = styled.div`
  color: ${theme.danger.d100};
  font-size: ${theme.caption12};
`;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
