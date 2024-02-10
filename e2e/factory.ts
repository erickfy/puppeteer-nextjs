// import { faker } from '@faker-js/faker'
// import { USER_ROLE } from '@prisma/client'
// import { generateId } from 'lucia'

// export type TypeUsers = 'johan' | 'christian' | 'galgadot';

// export type TUsers = {
//   [x in TypeUsers]: {
//     id: string;
//     username: string;
//     fullNames: string;
//     password: string;
//     image: string;
//     role: USER_ROLE;
//     active: boolean;
//     searchs: {
//       instagram: string[];
//       amazon: string[];
//       mercadoLibre: string[];
//       bookStore: string[];
//     };
//   }
// }

// const searchs = {
//   instagram: ['iamstipke', 'leomessi', '13.andrea.15', 'lilabellk', 'gal_gadot'],
//   amazon: ['mac', 'laptop', 'camera', 'books'],
//   mercadoLibre: ['cortadora de cabello', 'laptop', 'camera', 'casco de moto'],
//   bookStore: [(new Date()).toISOString()],
// }

// const users: TUsers = {
//   johan: {
//     id: generateId(15),
//     username: 'johan2024',
//     fullNames: 'Johan Julio',
//     password: 'johan2024',
//     image: faker.image.avatar(),
//     role: USER_ROLE.ADMIN,
//     active: true,
//     searchs
//   },
//   galgadot: {
//     id: generateId(15),
//     username: 'galgadot2024',
//     fullNames: 'Gal Gadot',
//     password: 'galgadot2024',
//     image: faker.image.avatar(),
//     role: USER_ROLE.ADMIN,
//     active: true,
//     searchs
//   },
//   christian: {
//     id: generateId(15),
//     username: 'christiansoledispa2024',
//     fullNames: 'Christian Soledispa',
//     password: 'christiansoledispa2024',
//     image: faker.image.avatar(),
//     role: USER_ROLE.CLIENT,
//     active: true,
//     searchs
//   },
// }

// export default { users }