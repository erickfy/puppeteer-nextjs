import { hashedPassword } from '@/lib/hashPassword'
import { faker } from '@faker-js/faker'
import { USER_ROLE } from '@prisma/client';
import { generateId } from 'lucia';

// generate 10 users
const lengthUsers = 10;
export async function generateUsers() {
    const usersPromises = Array.from({ length: lengthUsers }, async (_, _index) => {
        const id = generateId(15)
        const username = faker.internet.userName();
        const hashPass = await hashedPassword(username);
        const fullNames = faker.person.fullName()
        const image = faker.image.avatar()
        const isActive = faker.helpers.shuffle([true, false])[0]
        const role = faker.helpers.shuffle(Object.keys(USER_ROLE))[0] as USER_ROLE
        return {
            id,
            username,
            fullNames,
            image,
            hashedPassword: hashPass,
            role,
            active: isActive,
        }
    })

    const users = await Promise.all(usersPromises)
    return users
}

export function generateTestUsers() {
    const users = Array.from({ length: 5 }, () => {
        const id = generateId(15);
        const username = faker.internet.userName()
        const password = faker.internet.password()
        return { id, username, password }
    })
    return users
}