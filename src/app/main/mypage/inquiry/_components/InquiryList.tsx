import React from 'react';
import styled from 'styled-components';
import InquiryItem from './InquiryItem';
import { Inquiry } from '@/types/inquiry';

interface InquiryListProps {
  inquiries: Inquiry[];
}

export default function InquiryList({ inquiries }: InquiryListProps) {
  if (inquiries.length === 0) {
    return <EmptyContainer>문의 내역이 없습니다.</EmptyContainer>;
  }

  return (
    <ListContainer>
      {inquiries.map((inquiry) => (
        <InquiryItem key={inquiry.id} inquiry={inquiry} />
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const EmptyContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px; // 피그마 디자인 참고하여 조정
  text-align: center;
  font-size: ${({ theme }) => theme.body16};
  color: ${({ theme }) => theme.gray.g60};
`;
