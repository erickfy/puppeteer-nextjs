import { db } from '@/lib/db';
import { FullConfig } from '@playwright/test';
import { mockUsers } from './constants';
import { deleteSessionsAndUsers, getSessions } from './helper';

export default async function globalTeardown(_config: FullConfig) {

    try {

        // users
        const clientUser = mockUsers["christian"]
        const adminUser = mockUsers["johan"]

        // get all sessions of users
        const sessions = await getSessions({ users: [clientUser, adminUser] })

        // sessions id
        const sessionClientId = sessions[0]?.sessions[0].id
        const sessionAdminId = sessions[1]?.sessions[0].id

        await deleteSessionsAndUsers({
            users: [clientUser.id, adminUser.id],
            sessions: [sessionClientId ?? '', sessionAdminId ?? ''],
        })

    } catch (error) {
        return new Error()
    }
}