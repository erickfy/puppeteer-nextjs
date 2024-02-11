import { hashedPassword } from '@/lib/hashPassword'
import { faker } from '@faker-js/faker'
import { USER_ROLE } from '@prisma/client';
import { generateId } from 'lucia';
import { format, addDays } from 'date-fns';

/**
 * DOCS: 
 * https://fakerjs.dev/api/image.html#image
 * https://fakerjs.dev/api/person.html#fullname
 * ...
 */

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

/**
 * DOCS:
 * https://fakerjs.dev/api/commerce#productname
 * https://fakerjs.dev/api/internet.html#username
 * https://fakerjs.dev/api/date.html#month
 */

const MAX_PRODUCTS = 10
export function generateAmazonHistory() {
    const products = Array.from({ length: MAX_PRODUCTS }, () => {
        return faker.commerce.productName();
    })
    return products;
}

export function generateMercadoLibreHistory() {
    const products = Array.from({ length: MAX_PRODUCTS }, () => {
        return faker.commerce.productName();
    })
    return products;
}

export function generateInstagramHistory() {
    const usernames = Array.from({ length: MAX_PRODUCTS }, () => {
        return faker.internet.userName();
    })
    return usernames;
}

export function generateBookStoreHistory() {
    const dateStrings = Array.from({ length: MAX_PRODUCTS }, () => {
        const str = faker.date.between({
            from: '2022-01-01T00:00:00.000Z', to: (new Date()).toISOString()
        })
        return str.toISOString()
    });

    return dateStrings;
}