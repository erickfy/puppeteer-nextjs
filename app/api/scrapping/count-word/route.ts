import { db } from "@/lib/db"
import { userAgent } from "next/server"
/**
 * @params userId: string
 * @params searchInput: string
 * @params type: 'instagram' | 'amazon' | 'mercado-libre' | 'book-store';
 * 
 */

enum TYPE {
    INSTAGRAM = 'instagram',
    AMAZON = 'amazon',
    BOOK_STORE = 'book-store',
    MERCADO_LIBRE = 'mercado-libre',
}

export async function POST(req: Request) {
    try {

        const data = await req.json()
        const userId = data.userId as string
        const searchInput = data.searchInput as string
        const type = data.type as string

        if (!userId) {
            // NO CONTENT
            return new Response(null, { status: 204 })
        }

        const typeSearch = {
            instagram: TYPE.INSTAGRAM === type,
            amazon: TYPE.AMAZON === type,
            bookStore: TYPE.BOOK_STORE === type,
            mercadoLibre: TYPE.MERCADO_LIBRE === type,
        }

        const user = await db.user.findFirst({
            where: { id: userId }, include: {
                instagramHistory: typeSearch.instagram,
                amazonHistory: typeSearch.amazon,
                bookStoreHistory: typeSearch.bookStore,
                mercadoLibreHistory: typeSearch.mercadoLibre,
            }
        })


        if (!userId) {
            // NO CONTENT NOT FOUND USER
            return new Response(null, { status: 204 })
        }

        // COUNTING WORD INSTAGRAM
        if (typeSearch.instagram && user?.instagramHistory) {
            const list = user.instagramHistory.list;
            list.push(searchInput)

            await db.user.update({
                where: { id: userId },
                data: {
                    instagramHistory: {
                        connectOrCreate: {
                            where: { userId: userId },
                            create: {
                                list
                            }
                        }
                    }
                }
            })
        }

        // COUNTING WORD AMAZON
        else if (typeSearch.amazon && user?.amazonHistory) {
            const list = user.amazonHistory.list;
            list.push(searchInput)

            await db.user.update({
                where: { id: userId },
                data: {
                    amazonHistory: {
                        connectOrCreate: {
                            where: { userId: userId },
                            create: {
                                list
                            }
                        }
                    }
                }
            })
        }

        // COUNTING WORD BOOKSTORE
        else if (typeSearch.bookStore && user?.bookStoreHistory) {
            const list = user.bookStoreHistory.list;
            list.push(searchInput)

            await db.user.update({
                where: { id: userId },
                data: {
                    bookStoreHistory: {
                        connectOrCreate: {
                            where: { userId: userId },
                            create: {
                                list
                            }
                        }
                    }
                }
            })
        }

        // COUNTING WORD MERCADOLIBRE
        else if (typeSearch.mercadoLibre && user?.mercadoLibreHistory) {
            const list = user.mercadoLibreHistory.list;
            list.push(searchInput)

            await db.user.update({
                where: { id: userId },
                data: {
                    mercadoLibreHistory: {
                        connectOrCreate: {
                            where: { userId: userId },
                            create: {
                                list
                            }
                        }
                    }
                }
            })
        }

        return new Response(null, { status: 200 })
    } catch (e) {
        console.error(e)
        return new Response(null, { status: 500 })
    }
}