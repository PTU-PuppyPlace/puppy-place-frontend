"use client";

import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";
import { buttonStyles } from "@/styles/ButtonStyles";

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
  contentPosition?: "only" | "after" | "before" | "default" | "";
  buttonText?: string;
  icon?: string;
  disabled?: "able" | "disable";
  clickFn?: () => void;
}

function BoxButton({
  buttonType,
  buttonHeight,
  buttonWidth,
  buttonText,
  borderType,
  contentPosition,
  icon,
  disabled,
  clickFn,
}: IBoxButton) {
  return (
    <Button
      style={{ ...buttonStyles[disabled || "able"][buttonType] }}
      $buttonHeight={buttonHeight}
      $buttonWidth={buttonWidth}
      $borderType={borderType}
      $buttonText={buttonText}
      $disabled={disabled}
      onClick={() => clickFn && !disabled && clickFn()}
    >
      <ContentContainer $contentPosition={contentPosition}>
        {buttonText && <span>{buttonText}</span>}
        {icon && <img src={icon} />}
      </ContentContainer>
    </Button>
  );
}

export default BoxButton;

const Button = styled.button<{
  $borderType?: string;
  $buttonHeight?: string;
  $buttonWidth?: string;
  $buttonText?: string;
  $disabled?: "able" | "disable";
}>`
  border-radius: ${({ $borderType }) => {
    switch ($borderType) {
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

  height: ${({ $buttonHeight }) => $buttonHeight + "px"};
  min-width: ${({ $buttonHeight }) => $buttonHeight + "px"};
  padding: ${({ $buttonText }) => $buttonText && "0 21px"};

  border-style: none;
  &:active {
    ${({ $disabled }) => ($disabled === "able" ? "opacity: 50%" : "")}
  }
`;

const ContentContainer = styled.div<{
  $contentPosition?: string;
}>`
  display: flex;
  align-items: center;
  gap: 7px;
  flex-direction: ${({ $contentPosition }) => {
    switch ($contentPosition) {
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
