'use client';

/**
 * TODO
 * 이메일, 비밀번호 칸 뒷부분에 체크 표시(인증 완료나 비밀번호 조건 충족 시 나타남)
 * 스크롤 시 헤더 영역 스크롤(컬러: G10)
 * 인증번호 유효시간 만료 시 alert, 이미 계정 있을 때의 처리
 */

import Label from '@/components/common/Label';
import styled from 'styled-components';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';
import React, { forwardRef } from 'react';
import Link from 'next/link';
import CTABottom from '@/components/layout/CTABottom';
import { useRouter } from 'next/navigation';
import { SignupSchemaType, signupSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, CheckMark } from '@/components/common/CheckControl';
import ErrorText from '@/components/common/ErrorText';
import { checkEmailCode, sendEmailCode, signup } from '@/services/account';
import { IErrorResponse } from '@/types/services';
import toast from 'react-hot-toast';

export default function Page() {
  const hookForm = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      agreement: [],
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
    getValues,
    getFieldState,
    setError,
  } = hookForm;
  const router = useRouter();

  const handleAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setValue('agreement', ['on', 'on', 'on', 'on']);
      setValue('isMarketingAgreed', true);
    } else {
      setValue('agreement', []);
      setValue('isMarketingAgreed', false);
    }
  };

  const handleEmailSent = async () => {
    await trigger('username');
    if (getFieldState('username').error) {
      return;
    }
    const emailValue = watch('username');

    try {
      await sendEmailCode(emailValue);
      toast('이메일 인증번호를 확인해주세요.');
      setValue('isEmailSent', true);
      await trigger('isEmailSent');
    } catch (err: unknown) {
      setError('username', {
        type: 'manual',
        message: (err as IErrorResponse).message,
      });
    }
  };

  const handleEmailVerified = async () => {
    const emailValue = watch('username');
    const authCodeValue = watch('authCode');

    if (!authCodeValue) {
      setError('authCode', {
        type: 'manual',
        message: '인증번호를 입력해주세요.',
      });
      return;
    }

    try {
      await checkEmailCode(emailValue, authCodeValue);
      setValue('isEmailVerified', true);
      await trigger('isEmailVerified');
    } catch (err: unknown) {
      setError('authCode', {
        type: 'manual',
        message: (err as IErrorResponse).message,
      });
    }
  };

  const onSubmit = async (data: SignupSchemaType) => {
    const result = await signup(data);
    if (result.isSuccess) {
      toast('회원가입이 완료되었습니다.');
      router.push('/signup/complete');
    }
  };
  return (
    <>
      <StyledForm id='signupForm' onSubmit={handleSubmit(onSubmit)}>
        <input type='hidden' {...register('isEmailSent')} />
        <input type='hidden' {...register('isEmailVerified')} />
        <StyledField>
          <Label>아이디(이메일)</Label>
          <TextField
            placeholder='예) pupply@place.com'
            disabled={getValues('isEmailVerified')}
            errorText={errors?.username?.message}
            {...register('username')}
          >
            <Button
              onClick={handleEmailSent}
              variant='default'
              size='32'
              disabled={getValues('isEmailVerified')}
              type='button'
            >
              {getValues('isEmailVerified') ? '재요청' : '인증 요청'}
            </Button>
          </TextField>
          {getValues('isEmailSent') && (
            <TextField
              disabled={getValues('isEmailVerified')}
              errorText={errors?.authCode?.message}
              {...register('authCode')}
            >
              <Button
                type='button'
                onClick={async () => {
                  await handleEmailVerified();
                }}
                variant='default'
                size='32'
                disabled={getValues('isEmailVerified')}
              >
                인증 확인
              </Button>
            </TextField>
          )}
        </StyledField>
        <StyledField>
          <Label>비밀번호</Label>
          <TextField
            type='password'
            placeholder='8자 이상의 영문 또는 영문+숫자+특수문자'
            errorText={errors?.password?.message}
            {...register('password')}
          />
        </StyledField>
        <StyledField>
          <Label>비밀번호 확인</Label>
          <TextField
            type='password'
            placeholder='비밀번호 재입력'
            errorText={errors?.passwordConfirm?.message}
            {...register('passwordConfirm')}
          />
        </StyledField>
        <StyledField>
          <Label>닉네임</Label>
          <TextField
            placeholder='닉네임 입력 (10자 이내)'
            errorText={errors?.nickname?.message}
            {...register('nickname', {
              onBlur: async (event) => {
                const checkResult = await checkNickname(event.target.value);
                if (!checkResult.isSuccess) {
                  setError('nickname', {
                    type: 'custom',
                    message: checkResult.message,
                  });
                }
              },
            })}
          />
        </StyledField>
        <StyledField gap='12px'>
          <Checkbox
            onChange={handleAllCheck}
            checked={
              watch('agreement').length === 4 &&
              watch('isMarketingAgreed') === true
            }
          >
            전체 동의
          </Checkbox>
          <SmallCheckControl
            text='[필수] 만 14세 이상'
            link=''
            {...register('agreement')}
          />
          <SmallCheckControl
            text='[필수] 서비스 이용약관'
            link=''
            {...register('agreement')}
          />
          <SmallCheckControl
            text='[필수] 위치기반 서비스 이용약관'
            link=''
            {...register('agreement')}
          />
          <SmallCheckControl
            text='[필수] 개인정보 수집 및 이용'
            link=''
            {...register('agreement')}
          />
          <SmallCheckControl
            text='[선택] 마케팅 및 광고 활용'
            link=''
            {...register('isMarketingAgreed')}
          />
          {errors?.agreement?.message && (
            <ErrorText>{errors?.agreement?.message}</ErrorText>
          )}
        </StyledField>
        <CTABottom>
          <Button type='submit' form='signupForm' variant='primary' size='52'>
            회원가입
          </Button>
        </CTABottom>
      </StyledForm>
      {/* <div>{state?.message}</div> */}
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

const CheckLink = styled(Link)`
  text-decoration: underline;
  color: ${({ theme }) => theme.gray.g60};
`;

const SmallCheckWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.gray.g60};
  height: 20px;
`;

const SmallCheckControl = forwardRef(function SmallCheckControl(
  props: {
    text: string;
    link: string;
  },
  ref?: React.Ref<HTMLInputElement>
) {
  const { text, link, ...rest } = props;
  return (
    <SmallCheckWrapper>
      <CheckMark ref={ref} {...rest}>
        {text}
      </CheckMark>
      <CheckLink href={link}>보기</CheckLink>
    </SmallCheckWrapper>
  );
});
