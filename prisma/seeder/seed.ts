import { generateAmazonHistory, generateBookStoreHistory, generateInstagramHistory, generateMercadoLibreHistory, generateUsers } from './helper'
import { db } from '@/lib/db'


const load = async () => {

    try {
        // ? seed database 🌱
        const users = await generateUsers()

        // WITHOUT LIST OF HISTORY
        // await db.$transaction([
        //     db.user.createMany({
        //         data: {
        //             ...users,
        //         }
        //     }),
        // ])

        await db.$transaction(
            users.map(user => {
                return db.user.create({
                    data: {
                        id: user.id,
                        username: user.username,
                        fullNames: user.fullNames,
                        image: user.image,
                        hashedPassword: user.hashedPassword,
                        role: user.role,
                        active: user.active,
                        instagramHistory: {
                            create: {
                                list: generateInstagramHistory()
                            }
                        },
                        amazonHistory: {
                            create: {
                                list: generateAmazonHistory()
                            }
                        },
                        bookStoreHistory: {
                            create: {
                                list: generateBookStoreHistory()
                            }
                        },
                        mercadoLibreHistory: {
                            create: {
                                list: generateMercadoLibreHistory()
                            }
                        }

                    },
                })
            })

        )


    } catch (e) {
        process.exit(1)
    } finally {
        await db.$disconnect()
    }
}
load()