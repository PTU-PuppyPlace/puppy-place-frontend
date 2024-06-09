"use client";

import { styled } from "styled-components";
import { TextFieldStyles } from "@/styles/TextFieldStyles";

interface ITextField {
  options: {
    textFiledPlaceholder?: string;
    errorMsg: {
      msg: string;
      errorFunc: () => boolean;
    };
    textFieldAbled?: boolean;
  };
}

function TextField({ options }: ITextField) {
  return (
    <TextFiledContainer err={options.errorMsg.errorFunc()}>
      <TextFiled
        disabled={options.textFieldAbled}
        err={options.errorMsg.errorFunc()}
        placeholder={options.textFiledPlaceholder}
      />
      {options.errorMsg.errorFunc() && <label> {options.errorMsg.msg}</label>}
    </TextFiledContainer>
  );
}

export default TextField;

const TextFiledContainer = styled.div<{ err: boolean }>`
  display: grid;
  gap: 8px;

  label {
    font-size: 12px;
    color: ${({ err }) => err && TextFieldStyles.TextFieldStyle.err};
  }
`;

const TextFiled = styled.input<{ err: boolean }>`
  max-width: 335px;
  height: 25px;
  border-style: none;
  outline: none;
  border-bottom: 2px solid
    ${({ err }) =>
      err
        ? TextFieldStyles.TextFieldStyle.err
        : TextFieldStyles.TextFieldStyle.bottomBorderColor};

  &:disabled {
    background-color: ${TextFieldStyles.TextFieldStyle.disabledBackgroundColor};
  }

  &:focus {
    border-style: none;
    border-bottom: 1px solid ${TextFieldStyles.TextFieldStyle.focusColor};
  }
`;
