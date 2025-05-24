'use client';

import Label from '@/components/common/Label';
import styled from 'styled-components';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { changeNicknameSchema, ChangeNicknameSchemaType } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { changeNickname } from '@/services/setting';
import toast from 'react-hot-toast';

export default function Page() {
  const router = useRouter();
  const hookForm = useForm<ChangeNicknameSchemaType>({
    resolver: zodResolver(changeNicknameSchema),
    mode: 'onBlur',
    defaultValues: {
      nickname: '',
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = hookForm;

  const onSubmit = async (data: ChangeNicknameSchemaType) => {
    const result = await changeNickname(data.nickname);
    if (result.isSuccess) {
      toast('닉네임이 변경되었습니다.');
      router.push('/main/mypage/setting/account-info');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledField>
          <Label>변경할 닉네임</Label>
          <TextField
            errorText={errors?.nickname?.message}
            placeholder='닉네임 입력 (10자 이내)'
            {...register('nickname')}
          />
        </StyledField>
        <Button type='submit' variant='primary' size='52'>
          닉네임 변경
        </Button>
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
