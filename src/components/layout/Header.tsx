import styled from "styled-components";
import NavigationLeft from "@/components/icons/navigation-left.svg";

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
          <NavigationLeft onClick={onGoBack}>뒤로가기</NavigationLeft>
        )}
        {children}
      </LeftSection>
      {onExit && <button onClick={onExit}>나가기</button>}
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
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
