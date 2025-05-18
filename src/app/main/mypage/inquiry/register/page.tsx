'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import NavigationLeft from '@/components/icons/navigation-left.svg';
import CameraIcon from '@/components/icons/photo-edit-camera.svg';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import Label from '@/components/common/Label';
import { InquiryRegisterSchemaType, inquiryRegisterSchema } from './schema';
import TextArea from '@/components/common/TextArea';

// 문의 유형 정의
const inquiryTypes = [
  { value: 'login', label: '로그인 관련' },
  { value: 'register', label: '회원가입 관련' },
  { value: 'feature', label: '기능 관련' },
  { value: 'place', label: '장소 등록 관련' },
  { value: 'other', label: '기타 문의' },
];

export default function InquiryRegisterPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<InquiryRegisterSchemaType>({
    resolver: zodResolver(inquiryRegisterSchema),
    mode: 'onChange',
    defaultValues: {
      type: '',
      content: '',
      images: [],
    },
  });

  const handleGoBack = () => {
    router.back();
  };

  const handleImageUpload = () => {
    // 실제 구현에서는 파일 업로드 로직이 필요합니다
    // 여기서는 더미 이미지 URL을 추가합니다
    if (images.length < 5) {
      const newImages = [
        ...images,
        `https://picsum.photos/200/200?random=${images.length}`,
      ];
      setImages(newImages);
      setValue('images', newImages);
      trigger('images');
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue('images', newImages);
    trigger('images');
  };

  const onSubmit = (data: InquiryRegisterSchemaType) => {
    console.log('제출된 데이터:', data);
    // 여기에서 API 호출 등의 로직을 추가할 수 있습니다
    router.push('/main/mypage/inquiry');
  };

  return (
    <Container>
      <HeaderContainer>
        <BackButton onClick={handleGoBack}>
          <NavigationLeft />
        </BackButton>
        <HeaderTitle>1:1 문의하기</HeaderTitle>
      </HeaderContainer>
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormSection>
            <Label required>문의 유형</Label>
            <Select
              reactHookForm={{
                setValue,
                trigger,
                name: 'type',
              }}
              errorText={errors.type?.message}
              options={inquiryTypes}
              placeholder='문의 유형 선택'
            />
          </FormSection>

          <FormSection>
            <Label required>문의 내역</Label>
            <TextArea
              {...register('content')}
              placeholder='문의하고자 하는 내용을 작성해주세요.'
              errorText={errors.content?.message}
            />
          </FormSection>

          <FormSection>
            <Label>사진 첨부</Label>
            <ImageSection>
              <ImageUploadButton onClick={handleImageUpload} type='button'>
                <CameraIcon />
                <ImageCount>{images.length}/5</ImageCount>
              </ImageUploadButton>
              {images.length > 0 && (
                <ImageContainer>
                  {images.map((image, index) => (
                    <ImageWrapper key={index}>
                      <Image src={image} alt={`첨부 이미지 ${index + 1}`} />
                      <DeleteButton
                        type='button'
                        onClick={() => handleRemoveImage(index)}
                      >
                        ×
                      </DeleteButton>
                    </ImageWrapper>
                  ))}
                </ImageContainer>
              )}
            </ImageSection>
            <ImageCaption>*최대 5개 등록 가능</ImageCaption>
          </FormSection>

          <SubmitButton size='52' type='submit' disabled={!isValid}>
            1:1 문의하기
          </SubmitButton>
        </Form>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.extraWhite};
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${({ theme }) => theme.extraWhite};
  border-bottom: 1px solid ${({ theme }) => theme.gray.g10};
  padding: 16px 20px;
  flex-shrink: 0;
`;

const BackButton = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.gray.g80};
  svg {
    font-size: 24px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.title19};
  font-weight: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.gray.g100};
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ImageSection = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const ImageUploadButton = styled.button`
  width: 72px;
  height: 72px;
  border: 1px solid ${({ theme }) => theme.gray.g10};
  border-radius: 8px;
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
`;

const ImageCount = styled.span`
  font-size: ${({ theme }) => theme.caption12};
  color: ${({ theme }) => theme.gray.g100};
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  border: none;
`;

const ImageCaption = styled.span`
  font-size: ${({ theme }) => theme.caption12};
  color: ${({ theme }) => theme.gray.g60};
`;

const SubmitButton = styled(Button)`
  margin-top: auto;
  background-color: ${({ theme }) => theme.primary.p100};
  color: white;
`;
