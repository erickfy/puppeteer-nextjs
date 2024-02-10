
import { chromium, FullConfig } from '@playwright/test';
import { PrismaClient, USER_ROLE } from '@prisma/client';

// Shared Below...
import { ADMIN, APP_URL, LOGIN_URL, USER, } from './constants';
import { faker } from '@faker-js/faker';
import { Argon2id } from 'oslo/password';

async function globalSetup(_config: FullConfig) {


    const users = {
        johan: {
            id: '1111-johan2024',
            username: 'johan2024',
            fullNames: 'Johan Julio',
            password: 'johan2024',
            image: faker.image.avatar(),
            role: USER_ROLE.ADMIN,
            active: true,
            searchs
        },
        galgadot: {
            id: '1111-galgadot2024',
            username: 'galgadot2024',
            fullNames: 'Gal Gadot',
            password: 'galgadot2024',
            image: faker.image.avatar(),
            role: USER_ROLE.ADMIN,
            active: true,
            searchs
        },
        christian: {
            id: '1111-christian2024',
            username: 'christiansoledispa2024',
            fullNames: 'Christian Soledispa',
            password: 'christiansoledispa2024',
            image: faker.image.avatar(),
            role: USER_ROLE.CLIENT,
            active: true,
            searchs
        },
    }


    const db = new PrismaClient()
    const allUsers = Object.values(users)

    const SECRET_HASH_PASS = Buffer
        .from(process.env.SECRET_HASH as string, 'utf8') as Buffer;

    const hashedPasswords = await Promise.all((allUsers)
        .map(async (user) => await
            new Argon2id({ secret: SECRET_HASH_PASS }).hash(user.password)));


    await db.$transaction(allUsers
        .map((user, index) => {
            const hash = hashedPasswords[index]
            return db.user.create({
                data: {
                    id: user.id,
                    username: user.username,
                    fullNames: user.fullNames,
                    active: user.active,
                    hashedPassword: hash,
                    role: user.role,
                    instagramHistory: {
                        create: {
                            list: user.searchs.instagram
                        }
                    },
                    amazonHistory: {
                        create: {
                            list: user.searchs.amazon
                        }
                    },
                    bookStoreHistory: {
                        create: {
                            list: user.searchs.bookStore
                        }
                    },
                    mercadoLibreHistory: {
                        create: {
                            list: user.searchs.mercadoLibre
                        }
                    },
                }
            });
        }));





    // PLAYWRIGHT
    const clientUser = users["christian"] //CLIENT
    const adminUser = users["johan"] //ADMIN

    const browser = await chromium.launch();

    // ADMIN
    const adminPage = await browser.newPage();
    await adminPage.goto(LOGIN_URL);
    await adminPage.locator('#username').fill(adminUser.username)
    await adminPage.locator('#password').fill(adminUser.password)
    await adminPage.click('#continue')

    await adminPage.waitForLoadState('networkidle')

    await adminPage.waitForURL((url) => url.origin === APP_URL, { waitUntil: 'networkidle' });

    // This saves everything about `adminPage` so far into a named `storageState` 
    await adminPage.context().storageState({ path: ADMIN.storageState });


    // CLIENT
    const userPage = await browser.newPage();
    await userPage.goto(LOGIN_URL);
    await userPage.locator('#username').fill(clientUser.username)
    await userPage.locator('#password').fill(clientUser.password)
    await userPage.click('#continue')

    await userPage.waitForLoadState('networkidle')
    await userPage.waitForURL((url) => url.origin === APP_URL, { waitUntil: 'networkidle' });

    await userPage.context().storageState({ path: USER.storageState });

    await browser.close();

}

const searchs = {
    instagram: ['iamstipke', 'leomessi', '13.andrea.15', 'lilabellk', 'gal_gadot'],
    amazon: ['mac', 'laptop', 'camera', 'books'],
    mercadoLibre: ['cortadora de cabello', 'laptop', 'camera', 'casco de moto'],
    bookStore: [(new Date()).toISOString()],
}





export default globalSetup;