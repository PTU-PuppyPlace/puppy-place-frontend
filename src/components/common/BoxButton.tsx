"use client";

import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

interface IBoxButton {
  buttonType:
    | "primary"
    | "default"
    | "outline"
    | "dangerPrimary"
    | "dangerSecondary";
  buttonHeight?: "32" | "40" | "52" | "";
  buttonWidth?: string;
  borderType?: "circle" | "default" | "";
  iconPosition?: "only" | "after" | "before" | "default" | "";
  buttonText?: string;
  icon?: string;
  clickFn?: () => void;
}

interface IButtonStyles {
  [buttonType: string]: any;
}

const buttonStyles: IButtonStyles = {
  primary: {
    backgroundColor: theme.primary.p100,
    color: theme.extraWhite,
  },
  default: {
    backgroundColor: theme.defaultButton,
    color: theme.gray.g100,
  },
  outline: {
    backgroundColor: theme.extraWhite,
    color: theme.gray.g100,
    border: `2px ${theme.gray.g20} solid`,
  },
  dangerPrimary: {
    backgroundColor: theme.danger.d100,
    color: theme.extraWhite,
  },
  dangerSecondary: {
    backgroundColor: theme.extraWhite,
    color: theme.danger.d100,
    border: `2px ${theme.gray.g20} solid`,
  },
};

function BoxButton({
  buttonType,
  buttonHeight,
  buttonWidth,
  buttonText,
  borderType,
  iconPosition,
  icon,
  clickFn,
}: IBoxButton) {
  return (
    <Button
      style={{ ...buttonStyles[buttonType] }}
      buttonHeight={buttonHeight}
      buttonWidth={buttonWidth}
      borderType={borderType}
      buttonText={buttonText}
      onClick={clickFn && clickFn}
    >
      <ContentContainer iconPosition={iconPosition} buttonHeight={buttonHeight}>
        {buttonText && <span>{buttonText}</span>}
        {icon && <img src={icon} />}
      </ContentContainer>
    </Button>
  );
}

export default BoxButton;

const Button = styled.button<{
  borderType?: string;
  buttonHeight?: string;
  buttonWidth?: string;
  buttonText?: string;
}>`
  border-radius: ${({ borderType }) => {
    switch (borderType) {
      case "circle":
        return "999px";
      case "default":
      default:
        return "6px";
    }
  }};

  display: flex;
  justify-content: center;
  align-items: center;

  height: ${({ buttonHeight }) => buttonHeight + "px"};
  min-width: ${({ buttonHeight }) => buttonHeight + "px"};
  padding: ${({ buttonText }) => buttonText && "0 21px"};

  border-style: none;
  &:active {
    opacity: 50%;
  }
`;

const ContentContainer = styled.div<{
  iconPosition?: string;
  buttonHeight?: string;
}>`
  display: flex;
  align-items: center;
  gap: 7px;
  flex-direction: ${({ iconPosition }) => {
    switch (iconPosition) {
      case "before":
        return "row-reverse";
      case "only":
      case "after":
      case "default":
      default:
        return "row";
    }
  }};

  img {
    height: 24px;
  }
`;
