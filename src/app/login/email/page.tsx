'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import TextField from '@/components/common/TextField';
import { Checkbox } from '@/components/common/CheckControl';
import Button from '@/components/common/Button';
import { login } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

const Login = () => {
  const [isChecked, handleCheck] = React.useReducer(
    (checked) => !checked,
    false
  );
  const [state, formAction] = useFormState(login, null);

  return (
    <>
      <Form action={formAction}>
        <TextField
          name='email'
          placeholder='아이디(이메일)'
          errorText={state?.errors?.email}
        />
        <TextField
          name='password'
          placeholder='비밀번호'
          errorText={state?.errors?.password}
        />
        <Checkbox checked={isChecked} onChange={handleCheck}>
          자동로그인
        </Checkbox>
        <Button onClick={() => {}} variant='primary' size='52'>
          로그인
        </Button>
      </Form>
      <Links>
        <Link href='/signup'>회원가입</Link>
        <Link href='/find-password'>비밀번호 재설정</Link>
      </Links>
    </>
  );
};

export default Login;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const Links = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.gray.g60};
  gap: 8px;
  > *:not(:last-child)::after {
    content: '|';
    margin-left: 8px;
  }
`;
