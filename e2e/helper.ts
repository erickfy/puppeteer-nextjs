import { db } from "@/lib/db";
import { USER_ROLE } from "@prisma/client";

type TUsers = {
    id: string;
    username: string;
    fullNames: string;
    password: string;
    image: string;
    role: USER_ROLE;
    active: boolean;
    searchs: {
        instagram: string[];
        amazon: string[];
        mercadoLibre: string[];
        bookStore: string[];
    }
}

type TParams = {
    users: TUsers[],
    hashUsers: string[]
}


export async function getSessions({ users }: { users: TUsers[] }) {
    return await db.$transaction(
        users.map(user =>
            db.user.findFirst({

                where: { id: user.id },
                select: {
                    sessions: {
                        select: {
                            id: true
                        }
                    }
                }
            })
        )
    )
}

export async function createUsers({ users, hashUsers }: TParams) {
    try {
        await db.$transaction(
            users.map((user, index) => {
                const hash = hashUsers[index]
                const data = {
                    username: user.username,
                    fullNames: user.fullNames,
                    active: user.active,
                    hashedPassword: hash,
                    role: user.role,
                    image: user.image,
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
                    }
                }

                return db.user.upsert({
                    where: { id: user.id },
                    update: {},
                    create: {
                        id: user.id,
                        ...data,
                    }
                });
            }));
    } catch (error) {
        new Error()
    }
}

export async function deleteSessionsAndUsers({ users, sessions }: { users: string[], sessions: string[] }) {
    await db.$transaction(
        [
            // first delete sessions of users
            ...sessions.map(id => db.session.delete({ where: { id } })),
            // delete user 
            ...users.map(id => db.user.delete({ where: { id } }))
        ]
    )
}