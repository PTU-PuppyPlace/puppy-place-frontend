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
      <StyledTitle>{`인증번호가 전송되었습니다.\n6자리 인증번호를 입력해 주세요.`}</StyledTitle>
      <StyledForm>
        <StyledField>
          <Label>인증번호</Label>
          <TextField onChange={() => {}} value=''>
            <Button
              onClick={() => {}}
              variant='default'
              size='32'
              type='button'
            >
              재전송
            </Button>
          </TextField>
        </StyledField>
        <CTABottom>
          <Button
            onClick={() => {
              router.push('/find-password/3');
            }}
            variant='primary'
            size='52'
          >
            인증번호 확인
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
