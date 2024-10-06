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
      <StyledTitle>{`비밀번호를 재설정해 주세요.`}</StyledTitle>
      <StyledForm>
        <StyledField>
          <Label>비밀번호</Label>
          <TextField type='password' onChange={() => {}} value='' />
        </StyledField>
        <StyledField>
          <Label>비밀번호 확인</Label>
          <TextField type='password' onChange={() => {}} value='' />
        </StyledField>
        <CTABottom>
          <Button
            onClick={() => {
              console.log('회원가입');
              router.push('/login');
            }}
            variant='primary'
            size='52'
          >
            비밀번호 변경
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
