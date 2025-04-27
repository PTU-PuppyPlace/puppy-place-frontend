'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import TextField from '@/components/common/TextField';
import Select from '@/components/common/Select';
import { Option } from '@/components/common/Select';
import { DatePicker } from '@/components/common/DatePicker';
import { FormGroup, FormSection } from '@/components/common/Form';
import Label from '@/components/common/Label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PetRegisterSchemaType, petRegisterSchema } from './schema';
import Segment from '@/components/common/Segment';

export default function PetRegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PetRegisterSchemaType>({
    resolver: zodResolver(petRegisterSchema),
    mode: 'onBlur',
  });

  // 품종 옵션 - 실제로는 API에서 가져올 데이터
  const breedOptions: Option[] = [
    { value: 'maltese', label: '말티즈' },
    { value: 'poodle', label: '푸들' },
    { value: 'pomeranian', label: '포메라니안' },
    { value: 'shihtzu', label: '시츄' },
    { value: 'yorkshire', label: '요크셔테리어' },
    { value: 'other', label: '기타' },
  ];

  const genderOptions: {
    text: string;
    value: PetRegisterSchemaType['gender'];
  }[] = [
    { text: '남아', value: 'male' },
    { text: '여아', value: 'female' },
  ];

  const handleNeuteredChange = (index: number) => {
    setValue('isNeutered', index === 0);
  };

  const handleGenderChange = (index: number) => {
    setValue('gender', genderOptions[index].value);
  };

  const onSubmit = (data: PetRegisterSchemaType) => {
    console.log('반려동물 등록:', data);

    // 등록 완료 후 마이페이지로 이동
    router.push('/main/mypage');
  };

  return (
    <Container>
      <FormSection id='petRegisterForm' onSubmit={handleSubmit(onSubmit)}>
        <ProfileImageSection>
          <ProfileImagePlaceholder>
            <DogIcon />
            <PlusIcon />
          </ProfileImagePlaceholder>
        </ProfileImageSection>

        <FormGroup>
          <Label required>반려동물 이름</Label>
          <TextField
            placeholder='이름을 입력해주세요.'
            errorText={errors?.petName?.message}
            {...register('petName')}
          />
        </FormGroup>

        <FormGroup>
          <Label>동물 등록 번호</Label>
          <TextField
            placeholder='반려동물 등록번호를 입력해주세요.'
            {...register('registrationNumber')}
          />
        </FormGroup>

        <FormGroup>
          <Label required>반려동물 생일</Label>
          <DatePicker
            errorText={errors?.birthdate?.message}
            placeholder='생일 선택'
            {...register('birthdate')}
          />
        </FormGroup>

        <FormGroup>
          <Label required>품종</Label>
          <Select
            options={breedOptions}
            placeholder='품종 선택'
            errorText={errors?.breed?.message}
            {...register('breed')}
          />
        </FormGroup>

        <FormGroup>
          <Label required>중성화 여부</Label>
          <Segment
            options={[
              { text: '중성화 완료', value: 'true' },
              { text: '중성화 전', value: 'false' },
            ]}
            onClick={handleNeuteredChange}
            errorText={errors?.isNeutered?.message}
          />
        </FormGroup>

        <FormGroup>
          <Label required>성별</Label>
          <Segment
            options={genderOptions}
            onClick={handleGenderChange}
            errorText={errors?.gender?.message}
          />
        </FormGroup>

        <FormGroup>
          <Label required>몸무게</Label>
          <TextField
            placeholder='몸무게를 입력해주세요.'
            errorText={errors?.weight?.message}
            {...register('weight')}
          />
        </FormGroup>

        <FormGroup>
          <Label>성격</Label>
          <StyledTextArea
            placeholder='내 반려동물은 어떤 성격을 갖고 있나요?'
            {...register('personality')}
          />
        </FormGroup>

        <Button
          variant='primary'
          size='52'
          type='submit'
          form='petRegisterForm'
          style={{ width: '335px' }}
        >
          등록하기
        </Button>
      </FormSection>
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: ${({ theme }) => theme.extraWhite};
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
`;

const ProfileImageSection = styled.div`
  padding: 32px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImagePlaceholder = styled.div`
  width: 105px;
  height: 105px;
  border-radius: 105px;
  background-color: #f6f6f6;
  border: 1.4px solid #d6d6d6;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const DogIcon = styled.div`
  width: 40px;
  height: 40px;
  opacity: 0.4;
`;

const PlusIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: #ffffff;
    width: 12px;
    height: 1.5px;
  }
  &:after {
    transform: rotate(90deg);
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 124px;
  border: 1px solid #d6d6d6;
  border-radius: 8px;
  padding: 12px 16px;
  outline: none;
  font-size: 15px;
  line-height: 1.48;
  color: ${({ theme }) => theme.gray.g100};
  &::placeholder {
    color: #adadad;
  }
  resize: none;
`;
