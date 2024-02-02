import { PrismaClient } from '@prisma/client'
import { generateTestUsers, generateUsers } from './helper'

const prisma = new PrismaClient()

const load = async () => {

    try {
        // ? seed database 🌱
        // const users = await generateUsers()
        const testUsers = await generateTestUsers()

        await prisma.$transaction([
            // prisma.user.createMany({
            //     data: users
            // }),
            prisma.testUser.createMany({
                data: testUsers
            })
        ])



    } catch (e) {
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}
load()