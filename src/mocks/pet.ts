import { Pet } from '@/types/pet';

export const SAMPLE_PETS: Pet[] = [
  {
    id: 1,
    profileImage: 'https://picsum.photos/id/237/800/600',
    petName: '무무',
    birthdate: new Date('2020-01-01'),
    breed: '포메라니안',
    isNeutered: true,
    gender: 'male',
    weight: 10,
  },
  {
    id: 2,
    profileImage: 'https://picsum.photos/id/239/800/600',
    petName: '미미',
    birthdate: new Date('2020-01-01'),
    breed: '포메라니안',
    isNeutered: true,
    gender: 'female',
    weight: 10,
  },
];
