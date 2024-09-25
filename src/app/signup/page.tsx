'use client';

import Label from '@/components/common/Label';
import styled from 'styled-components';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';
import { Checkbox, CheckMark } from '@/components/common/CheckControl';
import React from 'react';
import Link from 'next/link';
import CTABottom from '@/components/layout/CTABottom';

export default function Page() {
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [isVerificated, setIsVerificated] = React.useState(false);

  return (
    <StyledForm>
      <StyledField>
        <Label>아이디(이메일)</Label>
        <TextField
          placeholder='예) pupply@place.com'
          onChange={() => {}}
          value=''
          disabled={isVerificated}
        >
          <Button
            onClick={() => {
              setIsEmailSent(true);
            }}
            variant='default'
            size='32'
            disabled={isVerificated}
            type='button'
          >
            {isEmailSent ? '재요청' : '인증 요청'}
          </Button>
        </TextField>
        {isEmailSent && (
          <TextField onChange={() => {}} value='' disabled={isVerificated}>
            <Button
              onClick={() => {
                setIsVerificated(true);
              }}
              variant='default'
              size='32'
              disabled={isVerificated}
            >
              인증 확인
            </Button>
          </TextField>
        )}
      </StyledField>
      <StyledField>
        <Label>비밀번호</Label>
        <TextField
          placeholder='8자 이상의 영문 또는 영문+숫자+특수문자'
          onChange={() => {}}
          value=''
        />
      </StyledField>
      <StyledField>
        <Label>비밀번호 확인</Label>
        <TextField placeholder='비밀번호 재입력' onChange={() => {}} value='' />
      </StyledField>
      <StyledField>
        <Label>닉네임</Label>
        <TextField
          placeholder='닉네임 입력 (10자 이내)'
          onChange={() => {}}
          value=''
        />
      </StyledField>
      <StyledField gap='12px'>
        <Checkbox checked={false} onChange={() => {}}>
          전체 동의
        </Checkbox>
        <SmallCheckControl text='[필수] 만 14세 이상' link='' />
        <SmallCheckControl text='[필수] 서비스 이용약관' link='' />
        <SmallCheckControl text='[필수] 위치기반 서비스 이용약관' link='' />
        <SmallCheckControl text='[필수] 개인정보 수집 및 이용' link='' />
        <SmallCheckControl text='[선택] 마케팅 및 광고 활용' link='' />
      </StyledField>
      <CTABottom>
        <Button
          onClick={() => {
            console.log('회원가입');
          }}
          variant='primary'
          size='52'
        >
          회원가입
        </Button>
      </CTABottom>
    </StyledForm>
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

const SmallCheckWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.gray.g60};
  height: 20px;
`;

const CheckLink = styled(Link)`
  text-decoration: underline;
  color: ${({ theme }) => theme.gray.g60};
`;

const SmallCheckControl = ({ text, link }: { text: string; link: string }) => {
  return (
    <SmallCheckWrapper>
      <CheckMark checked={false} onChange={() => {}}>
        {text}
      </CheckMark>
      <CheckLink href={link}>보기</CheckLink>
    </SmallCheckWrapper>
  );
};
