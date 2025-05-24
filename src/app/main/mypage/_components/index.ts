import styled from 'styled-components';

export { default as Header } from './Header';
export { default as UserInfo } from './UserInfo';
export { default as PetSection } from './PetSection';
export { default as VisitedCafesSection } from './VisitedCafesSection';
export { default as LinkSection } from './LinkSection';
export { default as LogoutButtonWrapper } from './LogoutButtonWrapper';

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.body13};
  color: ${({ theme }) => theme.gray.g100};
  padding: 24px 20px 0 20px;
`;
