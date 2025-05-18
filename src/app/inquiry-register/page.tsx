'use client';

import React, { useState, useRef } from 'react';
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
import DeleteIcon from '@/components/icons/fill-delete.svg';

// 문의 유형 정의
const inquiryTypes = [
  { value: 'login', label: '로그인 관련' },
  { value: 'register', label: '회원가입 관련' },
  { value: 'feature', label: '기능 관련' },
  { value: 'place', label: '장소 등록 관련' },
  { value: 'other', label: '기타 문의' },
];

interface ImageFile {
  file: File;
  preview: string;
}

export default function InquiryRegisterPage() {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    router.push('/main/mypage/inquiry');
  };

  const handleImageUploadClick = () => {
    // 파일 선택 다이얼로그 열기
    fileInputRef.current?.click();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // 최대 5개까지만 추가 가능
    const remainingSlots = 5 - imageFiles.length;
    if (remainingSlots <= 0) return;

    // 선택한 파일들을 처리
    const newFiles = Array.from(files).slice(0, remainingSlots);

    const newImageFiles = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedImageFiles = [...imageFiles, ...newImageFiles];
    setImageFiles(updatedImageFiles);

    // React Hook Form에 이미지 파일들 설정
    setValue(
      'images',
      updatedImageFiles.map((img) => img.file.name),
      { shouldValidate: true }
    );

    // 파일 input 초기화 (같은 파일 다시 선택 가능하게)
    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    // 브라우저 메모리 누수 방지를 위해 URL 해제
    URL.revokeObjectURL(imageFiles[index].preview);

    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newImageFiles);

    // React Hook Form에 업데이트
    setValue(
      'images',
      newImageFiles.map((img) => img.file.name),
      { shouldValidate: true }
    );
  };

  const onSubmit = (data: InquiryRegisterSchemaType) => {
    // FormData 생성하여 파일과 함께 서버로 전송할 준비
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('content', data.content);

    // 파일 추가
    imageFiles.forEach((imgFile) => {
      formData.append('images', imgFile.file);
    });

    console.log('제출된 데이터:', data);
    console.log(
      '제출될 파일:',
      imageFiles.map((img) => img.file.name)
    );

    // 여기에서 API 호출 등의 로직을 추가할 수 있습니다
    // 예: await fetch('/api/inquiry', { method: 'POST', body: formData });

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
              minHeight='206px'
            />
          </FormSection>

          <FormSection>
            <Label>사진 첨부</Label>
            <ImageSection>
              <ImageUploadButton
                onClick={handleImageUploadClick}
                type='button'
                disabled={imageFiles.length >= 5}
              >
                <CameraIcon />
                <ImageCount>{imageFiles.length}/5</ImageCount>
              </ImageUploadButton>

              {/* 숨겨진 파일 입력 필드 */}
              <HiddenFileInput
                ref={fileInputRef}
                type='file'
                accept='image/*'
                multiple
                onChange={handleImageSelect}
              />

              {imageFiles.length > 0 &&
                imageFiles.map((imageFile, index) => (
                  <ImageWrapper key={index}>
                    <Image
                      src={imageFile.preview}
                      alt={`첨부 이미지 ${index + 1}`}
                    />
                    <DeleteButton
                      type='button'
                      onClick={() => handleRemoveImage(index)}
                    >
                      <DeleteIcon />
                    </DeleteButton>
                  </ImageWrapper>
                ))}
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImageCount = styled.span`
  font-size: ${({ theme }) => theme.caption12};
  color: ${({ theme }) => theme.gray.g100};
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  width: 24px;
  height: 24px;
  svg {
    stroke: white;
  }
`;

const ImageCaption = styled.span`
  font-size: ${({ theme }) => theme.caption12};
  color: ${({ theme }) => theme.gray.g60};
`;

const SubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.primary.p100};
  color: white;
  position: fixed;
  bottom: 20px;
  width: calc(${({ theme }) => theme.maxWidth} - 40px);
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
`;
