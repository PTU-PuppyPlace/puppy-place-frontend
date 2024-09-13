'use client';

import Label from '@/components/common/Label';
import styled from 'styled-components';
import TextField from '@/components/common/TextField';
import Button from '@/components/common/Button';

export default function Page() {
  return (
    <StyledForm>
      <Label>아이디(이메일)</Label>
      <TextField
        placeholder='예) pupply@place.com'
        onChange={() => {}}
        value=''
      >
        <Button onClick={() => {}} variant='default' size='32'>
          인증요청
        </Button>
      </TextField>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
