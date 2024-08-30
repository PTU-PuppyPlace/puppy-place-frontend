import styled from "styled-components";
import NavigationLeft from "@/components/icons/navigation-left.svg";
import NavigationClose from "@/components/icons/navigation-close.svg";
import theme from "@/styles/theme";

export default function Header({
  children,
  onGoBack,
  onExit,
}: {
  children: React.ReactNode;
  onGoBack?: () => void;
  onExit?: () => void;
}) {
  return (
    <StyledHeader>
      <LeftSection>
        {onGoBack && (
          <NavigationLeft
            onClick={onGoBack}
            strokeWidth={2}
            stroke={theme.gray.g100}
            width={24}
            height={24}
          >
            뒤로가기
          </NavigationLeft>
        )}
        {children}
      </LeftSection>
      {onExit && (
        <NavigationClose
          stroke={theme.gray.g100}
          width={24}
          height={24}
          onClick={onExit}
        >
          나가기
        </NavigationClose>
      )}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  width: 100%;
  position: absolute;
  top: 0;
  color: ${theme.gray.g100};
  font-size: ${theme.title19};
  font-weight: ${theme.bold};
  & svg {
    cursor: pointer;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
