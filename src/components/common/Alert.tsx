import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

type AlertType = "default" | "confirm" | "destructive";

interface AlertProps {
  type?: AlertType;
  children: React.ReactNode;
  title?: string;
  cancelLabel?: string;
  actionLabel?: string;
  isOpen: boolean;
  onAction?: () => void;
  onCancel?: () => void;
}

// Alert 컴포넌트
export const Alert: React.FC<AlertProps> = (props) => {
  const { children, isOpen, title } = props;
  if (!isOpen) return null;
  return (
    <AlertContainer>
      {title && <Title>{title}</Title>}
      {children && <Content>{children}</Content>}
      <ButtonGroup {...props} />
    </AlertContainer>
  );
};

const ButtonGroup: React.FC<AlertProps> = ({
  type,
  actionLabel = "확인",
  cancelLabel = "아니요",
  onAction,
  onCancel,
}) => {
  switch (type) {
    case "confirm":
      return (
        <ButtonSpace>
          <CancelButton onClick={onCancel}>{cancelLabel}</CancelButton>
          <PositiveButton onClick={onAction}>{actionLabel}</PositiveButton>
        </ButtonSpace>
      );
    case "destructive":
      return (
        <ButtonSpace>
          <CancelButton onClick={onCancel}>{cancelLabel}</CancelButton>
          <NegativeButton onClick={onAction}>{actionLabel}</NegativeButton>
        </ButtonSpace>
      );
    default:
      return (
        <ButtonSpace>
          <PositiveButton onClick={onAction}>{actionLabel}</PositiveButton>
        </ButtonSpace>
      );
  }
};
const AlertContainer = styled.div`
  display: flex;
  width: 320px;
  height: 122px;
  border-radius: 12px;
  border: 1px solid ${theme.background};
  box-shadow: 0px 2px 8px 0px #00000026;
  background-color: ${theme.extraWhite};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  gap: 4px;
  flex-direction: column;
`;

const ButtonSpace = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  bottom: 24px;
  right: 24px;
`;
const Title = styled.span`
  font-weight: ${theme.bold};
  font-size: ${theme.body17};'
  line-height: 25.5px;
`;

const Content = styled.span`
  font-size: ${theme.body16};
  color: ${theme.gray.g100};
  font-weight: ${theme.medium};
  line-height: 24px;
`;

const Button = styled.button`
  font-weight: ${theme.bold};
  font-size: ${theme.body16};
  border: none;
  cursor: pointer;
  background: none;
`;

const CancelButton = styled(Button)`
  color: ${theme.gray.g100};
`;

const PositiveButton = styled(Button)`
  color: ${theme.primary.p100};
`;

const NegativeButton = styled(Button)`
  color: ${theme.danger.d100};
`;
