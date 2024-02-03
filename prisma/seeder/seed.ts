import { PrismaClient } from '@prisma/client'
import { generateUsers } from './helper'

const prisma = new PrismaClient()

const load = async () => {

    try {
        // ? seed database 🌱
        const users = await generateUsers()

        await prisma.$transaction([
            prisma.user.createMany({
                data: users
            }),
        ])

    } catch (e) {
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}
load()