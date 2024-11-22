import styled from 'styled-components';
import theme from '@/styles/theme';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  errorText?: string;
  disabled?: boolean;
  width?: string;
  children?: React.ReactNode;
}

const TextField = (props: TextFieldProps) => {
  const { errorText, children, width, ...rest } = props;
  return (
    <TextFieldSection>
      <TextFieldWrapper $width={width}>
        <StyledTextField {...rest} $isError={!!errorText} />
        {children}
      </TextFieldWrapper>
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </TextFieldSection>
  );
};

export default TextField;

const StyledTextField = styled.input<{ $isError?: boolean }>`
  height: 40px;
  border: none;
  outline: none;
  border-bottom: 1px solid
    ${({ $isError }) =>
      $isError ? `${theme.danger.d100}` : `${theme.gray.g20}`};
  color: ${theme.gray.g100};
  flex: 1;
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

const TextFieldWrapper = styled.div<{ $width?: string }>`
  width: ${({ $width }) => $width || '100%'};
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  align-items: center;
`;

const TextFieldSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
