'use client'; // Add 'use client' directive

import React, { useEffect, useState } from 'react'; // Add React and useState imports
import styled from 'styled-components'; // Add styled-components import
import { useRouter } from 'next/navigation';
import NavigationLeft from '@/components/icons/navigation-left.svg';
import InquiryList from './_components/InquiryList';
import { Inquiry } from '@/types/inquiry';
import { MOCK_INQUIRIES } from '@/mocks/inquiry';
import Button from '@/components/common/Button';
import { getInquiry } from '@/services/inquiry';

export default function InquiryPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);

  //서버에서 데이터 가져오기
  useEffect(() => {
    const data = getInquiry();
    setInquiries(data);
  }, []);

  const handleGoBack = () => {
    router.push('/main/mypage');
  };

  const handleRegisterInquiry = () => {
    router.push('/inquiry-register');
  };

  return (
    <Container>
      <HeaderContainer>
        <BackButton onClick={handleGoBack}>
          <NavigationLeft />
        </BackButton>
        <HeaderTitle>문의 내역</HeaderTitle>
      </HeaderContainer>
      <SubContainer>
        <SubTitle>
          문의 내역
          <InquiryCount>{inquiries.length}</InquiryCount>
        </SubTitle>
        <Button size='40' onClick={handleRegisterInquiry}>
          1:1 문의하기
        </Button>
      </SubContainer>
      <Content>
        <InquiryList inquiries={inquiries} />
      </Content>
    </Container>
  );
}

// Add Container and Content styled components back
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.extraWhite};
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${({ theme }) => theme.extraWhite};
  border-bottom: 1px solid ${({ theme }) => theme.gray.g10};
  padding: 16px 20px;
  flex-shrink: 0; // Prevent header from shrinking
`;

const BackButton = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.gray.g80};
  svg {
    font-size: 24px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.title19};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
  margin: 0; // Remove default margin
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const SubTitle = styled.h2`
  font-size: ${({ theme }) => theme.body17};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
  margin: 0; // Remove default margin
`;

const InquiryCount = styled.span`
  font-size: ${({ theme }) => theme.body17};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g40};
  margin-left: 5px;
`;
