import { faker } from '@faker-js/faker';
import { USER_ROLE } from '@prisma/client';

export const APP_URL = 'http://localhost:3000';
export const LOGIN_URL = 'http://localhost:3000';
export const API_PREFIX = '/api';

export const ADMIN = {
  storageState: './e2e/temp/adminStorageState.json',
};
export const USER = {
  storageState: './e2e/temp/userStorageState.json',
};

const searchs = {
  instagram: ['iamstipke', 'leomessi', '13.andrea.15', 'lilabellk', 'gal_gadot'],
  amazon: ['mac', 'laptop', 'camera', 'books'],
  mercadoLibre: ['cortadora de cabello', 'laptop', 'camera', 'casco de moto'],
  bookStore: [(new Date()).toISOString()],
}

export const mockUsers = {
  johan: {
    id: '1234-johan2024',
    username: 'johan2024',
    fullNames: 'Johan Julio',
    password: 'johan2024',
    image: faker.image.avatar(),
    role: USER_ROLE.ADMIN,
    active: true,
    searchs,
  },
  galgadot: {
    id: '1234-galgadot2024',
    username: 'galgadot2024',
    fullNames: 'Gal Gadot',
    password: 'galgadot2024',
    image: faker.image.avatar(),
    role: USER_ROLE.ADMIN,
    active: true,
    searchs
  },
  christian: {
    id: '1234-christian2024',
    username: 'christiansoledispa2024',
    fullNames: 'Christian Soledispa',
    password: 'christiansoledispa2024',
    image: faker.image.avatar(),
    role: USER_ROLE.CLIENT,
    active: true,
    searchs
  },
}