import React, { useState } from 'react';
import styled from 'styled-components';
import { Inquiry } from '@/types/inquiry';
import ArrowDownIcon from '@/components/icons/interface-down.svg';
import ArrowUpIcon from '@/components/icons/interface-up.svg';
import Button from '@/components/common/Button';

interface InquiryItemProps {
  inquiry: Inquiry;
}

export default function InquiryItem({ inquiry }: InquiryItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const status = inquiry.answer ? '답변 완료' : '미답변';
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('삭제');
  };
  return (
    <ItemContainer onClick={toggleOpen} isOpen={isOpen}>
      <Summary>
        <LeftArea>
          <MetaArea>
            {inquiry.date}
            <span>|</span>
            <Status status={status}>{status}</Status>
          </MetaArea>
          <Title>{inquiry.title}</Title>
        </LeftArea>
        <RightArea>
          <Button variant='outline' size='32' onClick={handleClick}>
            삭제
          </Button>
          {isOpen ? (
            <ArrowUpIcon width={16} height={16} />
          ) : (
            <ArrowDownIcon width={16} height={16} />
          )}
        </RightArea>
      </Summary>

      {isOpen && (
        <>
          <Section>{inquiry.question}</Section>
          {inquiry.answer && (
            <AnswerText>
              <MetaArea>
                답변<span>|</span>
                {inquiry.answerDate}
              </MetaArea>
              {inquiry.answer}
            </AnswerText>
          )}
        </>
      )}
    </ItemContainer>
  );
}

const ItemContainer = styled.li<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.extraWhite};
  border-bottom: 1px solid ${({ theme }) => theme.gray.g10};
  cursor: pointer;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftArea = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`;

const RightArea = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.body16};
  color: ${({ theme }) => theme.gray.g100};
  font-weight: ${({ theme }) => theme.bold};
`;

const MetaArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.caption12};
  color: ${({ theme }) => theme.gray.g60};
  line-height: 1.5;
`;

const Section = styled.div`
  font-size: ${({ theme }) => theme.body14};
  color: ${({ theme }) => theme.gray.g100};
  font-weight: ${({ theme }) => theme.medium};
  line-height: 1.5;
  white-space: pre-wrap; // 줄바꿈 유지

  &:last-child {
    margin-bottom: 0;
  }
`;

const AnswerText = styled.div`
  font-size: ${({ theme }) => theme.body14};
  font-weight: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.gray.g100};
  line-height: 1.5;
  white-space: pre-wrap; // 줄바꿈 유지
  background-color: ${({ theme }) => theme.gray.g00};
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Status = styled.span<{ status: '답변 완료' | '미답변' }>`
  font-size: ${({ theme }) => theme.caption12};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme, status }) =>
    status === '답변 완료' ? theme.primary.p100 : theme.danger.d100};
  text-align: center;
`;
