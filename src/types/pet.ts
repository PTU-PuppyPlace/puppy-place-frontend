import { PetRegisterSchemaType } from '@/app/main/mypage/pet-register/schema';

export interface Pet extends PetRegisterSchemaType {
  id: number;
  profileImage: string;
}
