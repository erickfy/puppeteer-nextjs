
import { chromium, FullConfig } from '@playwright/test';

// Shared Below...
import { ADMIN, APP_URL, LOGIN_URL, mockUsers, USER, } from './constants';
import { hashedPassword } from '@/lib/hashPassword';
import { db } from '@/lib/db';
import { USER_ROLE } from '@prisma/client';
import { createUsers } from './helper';

export default async function globalSetup(_config: FullConfig) {


    // USERS
    const clientUser = mockUsers["christian"]
    const adminUser = mockUsers["johan"]

    const hashClient = await hashedPassword(clientUser.password);
    const hashAdmin = await hashedPassword(adminUser.password);

    await createUsers({
        users: [clientUser, adminUser],
        hashUsers: [hashClient, hashAdmin]
    })

    // PLAYWRIGHT
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

    const adminSessions = await db.session.findFirst({ where: { userId: adminUser.id }, select: { id: true, expiresAt: true } })
    const adminSessionId = adminSessions?.id ?? ''

    const expiresTimestampAdmin = adminSessions?.expiresAt ?
        Math.floor(adminSessions.expiresAt.getTime() / 1000) : undefined;

    await adminPage.context().addCookies([
        {
            name: 'auth.session-admin.test',
            // token or id of db
            value: adminSessionId,
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            sameSite: 'Lax',
            expires: expiresTimestampAdmin
        }
    ])


    // CLIENT OR USER
    const userPage = await browser.newPage();
    await userPage.goto(LOGIN_URL);
    await userPage.locator('#username').fill(clientUser.username)
    await userPage.locator('#password').fill(clientUser.password)
    await userPage.click('#continue')

    await userPage.waitForLoadState('networkidle')
    await userPage.waitForURL((url) => url.origin === APP_URL, { waitUntil: 'networkidle' });

    await userPage.context().storageState({ path: USER.storageState });

    const clientSessions = await db.session.findFirst({ where: { userId: clientUser.id }, select: { id: true, expiresAt: true } })
    const clientSessionId = clientSessions?.id ?? ''

    const expiresTimestampClient = clientSessions?.expiresAt ?
        Math.floor(clientSessions.expiresAt.getTime() / 1000) : undefined;

    await adminPage.context().addCookies([
        {
            name: 'auth.session-admin.test',
            // token or id of db
            value: clientSessionId,
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            sameSite: 'Lax',
            expires: expiresTimestampClient
        }
    ])

    await browser.close();

}
