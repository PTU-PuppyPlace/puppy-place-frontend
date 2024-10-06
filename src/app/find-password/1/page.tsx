'use client';

import Label from '@/components/common/Label';
import styled from 'styled-components';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';
import React from 'react';
import CTABottom from '@/components/layout/CTABottom';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <>
      <StyledTitle>{`인증받을 아이디(이메일)를\n입력해 주세요.`}</StyledTitle>
      <StyledForm>
        <StyledField>
          <Label>이메일 인증</Label>
          <TextField onChange={() => {}} value='' />
        </StyledField>
        <CTABottom>
          <Button
            onClick={() => {
              router.push('/find-password/2');
            }}
            variant='primary'
            size='52'
          >
            인증번호 요청
          </Button>
        </CTABottom>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;

const StyledField = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap || '8px'};
  width: 100%;
`;

const StyledTitle = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.title24};
  color: ${({ theme }) => theme.gray.g100};
  font-weight: ${({ theme }) => theme.medium};
  line-height: 150%;
  word-break: keep-all;
  white-space: pre-wrap;
`;
