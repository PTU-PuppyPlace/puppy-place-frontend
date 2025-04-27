import { z } from 'zod';

export const petRegisterSchema = z.object({
  petName: z.string().min(1, '이름을 입력해주세요.'),
  registrationNumber: z.string().optional(),
  birthdate: z.date({ message: '날짜를 선택해주세요.' }),
  breed: z.string({ message: '품종을 선택해주세요.' }),
  isNeutered: z.boolean({ message: '중성화 여부를 선택해주세요.' }),
  gender: z.enum(['male', 'female'], { message: '성별을 선택해주세요.' }),
  weight: z.number({ message: '몸무게를 입력해주세요.' }),
  personality: z.string().optional(),
});

export type PetRegisterSchemaType = z.infer<typeof petRegisterSchema>;
