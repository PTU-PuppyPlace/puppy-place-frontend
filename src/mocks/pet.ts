import { Pet } from '@/types/pet';

export const SAMPLE_PETS: Pet[] = [
  {
    id: 1,
    profileImage: '/images/pet/pet1.png',
    petName: '무무',
    birthdate: new Date('2020-01-01'),
    breed: '포메라니안',
    isNeutered: true,
    gender: 'male',
    weight: 10,
  },
  {
    id: 2,
    profileImage: '/images/pet/pet2.png',
    petName: '미미',
    birthdate: new Date('2020-01-01'),
    breed: '포메라니안',
    isNeutered: true,
    gender: 'female',
    weight: 10,
  },
];
