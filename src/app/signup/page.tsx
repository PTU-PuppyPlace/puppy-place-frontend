'use client';

/**
 * TODO
 * 이메일, 비밀번호 칸 뒷부분에 체크 표시(인증 완료나 비밀번호 조건 충족 시 나타남)
 * 유효성 검사 통과 못할 시 errorText 표시하는 것
 * 인풋들 인터랙션, 체크박스 전체동의 클릭 시 모든 체크박스 체크되게끔
 * 유효성 검사 미통과 시 회원가입 버튼 비활성화. 모두 통과했을 때 활성화
 * 스크롤 시 헤더 영역 스크롤(컬러: G10)
 * 인증번호 유효시간 만료 시 alert, 이미 계정 있을 때의 처리
 */

import Label from '@/components/common/Label';
import styled from 'styled-components';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';
import { Checkbox, CheckMark } from '@/components/common/CheckControl';
import React from 'react';
import Link from 'next/link';
import CTABottom from '@/components/layout/CTABottom';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [isVerificated, setIsVerificated] = React.useState(false);
  const router = useRouter();

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
            router.push('/login');
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
