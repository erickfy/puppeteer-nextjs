import { hashedPassword } from '@/lib/hashPassword'
import { faker } from '@faker-js/faker'
import { USER_ROLE } from '@prisma/client';

// generate 10 users
const lengthUsers = 10;
export async function generateUsers() {
    const usersPromises = Array.from({ length: lengthUsers }, async (_, _index) => {
        const userName = faker.internet.userName();
        const hashPass = await hashedPassword(userName);
        const isActive = faker.helpers.shuffle([true, false])[0]
        const role = faker.helpers.shuffle(Object.keys(USER_ROLE))[0] as USER_ROLE
        return {
            username: userName,
            fullNames: faker.person.fullName(),
            image: faker.image.avatar(),
            hashedPassword: hashPass,
            role,
            active: isActive,
        }
    })

    const users = await Promise.all(usersPromises)
    return users
}