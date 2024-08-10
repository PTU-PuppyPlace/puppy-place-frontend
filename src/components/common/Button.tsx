import React from "react";
import styled, { css } from "styled-components";
import theme from "@/styles/theme";

// Button variants
export type ButtonVariant =
  | "primary"
  | "default"
  | "outline"
  | "danger-primary"
  | "danger-secondary";

// Button sizes
export type ButtonSize = "32" | "40" | "52";

// Button props
interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isCircular?: boolean;
  isSameSize?: boolean;
}

// Button component
export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "32",
  children,
  onClick,
  disabled = false,
  isCircular = false,
  isSameSize = false,
}) => (
  <StyledButton
    variant={variant}
    size={size}
    onClick={onClick}
    disabled={disabled}
    isCircular={isCircular}
    isSameSize={isSameSize}
  >
    {children}
  </StyledButton>
);

// Styled component for the button
const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  gap: 8px;
  &:hover {
    filter: brightness(0.9); /* 10% 더 어둡게 */
  }
  &:disabled {
    cursor: not-allowed;
    filter: none;
  }

  /* Size styles */
  ${({ size, isSameSize }) => {
    switch (size) {
      case "32":
        return css`
          height: 32px;
          font-size: ${theme.caption13};
          border-radius: 6px;
          ${isSameSize ? `width: 32px;` : `padding: 12px;`}
          & svg {
            width: 16px;
            height: 16px;
          }
        `;
      case "40":
        return css`
          height: 40px;
          font-size: ${theme.body15};
          border-radius: 8px;
          ${isSameSize ? `width: 40px;` : `padding: 12px 16px;`}
          & svg {
            width: 20px;
            height: 20px;
          }
        `;
      case "52":
        return css`
          height: 52px;
          font-size: ${theme.body17};
          border-radius: 12px;
          ${isSameSize ? `width: 52px;` : `padding: 12px 20px;`}
          & svg {
            width: 24px;
            height: 24px;
          }
        `;
    }
  }}

  /* Variant styles */
  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return css`
          background-color: ${theme.primary.p100};
          color: ${theme.extraWhite};
          border: none;
          & svg {
            stroke: ${theme.extraWhite};
          }
          &:disabled {
            background-color: ${theme.primary.p50};
          }
        `;
      case "default":
        return css`
          background-color: ${theme.gray.g10};
          color: ${theme.gray.g100};
          border: none;
          & svg {
            stroke: ${theme.gray.g100};
          }
          &:disabled {
            background-color: ${theme.gray.g4};
            color: ${theme.gray.g40};
            & svg {
              stroke: ${theme.gray.g40};
            }
          }
        `;
      case "outline":
        return css`
          background-color: ${theme.extraWhite};
          color: ${theme.gray.g100};
          border: 1px solid ${theme.gray.g20};
          & svg {
            stroke: ${theme.gray.g100};
          }
          &:disabled {
            border: 1px solid ${theme.gray.g10};
            color: ${theme.gray.g40};
            & svg {
              stroke: ${theme.gray.g40};
            }
          }
        `;
      case "danger-primary":
        return css`
          background-color: ${theme.danger.d100};
          color: ${theme.extraWhite};
          border: none;
          & svg {
            stroke: ${theme.extraWhite};
          }
          &:disabled {
            background-color: ${theme.danger.d40};
          }
        `;
      case "danger-secondary":
        return css`
          background-color: ${theme.extraWhite};
          color: ${theme.danger.d100};
          border: 1px solid ${theme.gray.g20};
          & svg {
            stroke: ${theme.danger.d100};
          }
          &:disabled {
            border: 1px solid ${theme.gray.g10};
            color: ${theme.danger.d40};
            & svg {
              stroke: ${theme.danger.d40};
            }
          }
        `;
    }
  }}


${({ isCircular }) =>
    isCircular &&
    css`
      border-radius: 999px;
    `}
`;

export default Button;
