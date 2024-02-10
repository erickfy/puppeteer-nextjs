import { SECRET_HASH_PASS, hashedPassword } from '@/lib/hashPassword'
import { db } from '@/lib/db'
import { Argon2id } from 'oslo/password'
import { USER_ROLE } from '@prisma/client';

export const createUsers = async (users:
    // TUsers
    any
) => {
    try {


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


    } catch (e) {
        process.exit(1)
    } finally {
        await db.$disconnect()
    }
}


export async function deleteUser(id: string) {
    try {
        await db.user.delete({
            where: {
                id
            }
        })
    } catch (e) {
        process.exit(1)
    } finally {
        await db.$disconnect()
    }

}