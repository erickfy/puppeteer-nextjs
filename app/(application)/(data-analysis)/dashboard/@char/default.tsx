import Heading from '@/components/heading'
import React from 'react'
import { redirect } from 'next/navigation'
import { validateRequest } from '@/lib/auth'
import { db } from '@/lib/db'
import { USER_ROLE } from '@prisma/client'
import Recharts from '../../_components/recharts'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

enum TYPE_RADAR {
    INSTAGRAM = 'Instagram',
    MERCADO_LIBRE = 'Mercado Libre',
    AMAZON = 'Amazon',
    BOOK_STORE = 'Tienda de Libros',
}
enum MAP_TYPE {
    INSTAGRAM = "instagram",
    AMAZON = "amazon",
    BOOK_STORE = "bookStore",
    MERCADO_LIBRE = "mercadoLibre",
    TOTAL_LENGTH = "total",
}
export default async function DefaultDashboardChar() {
    const { user, session } = await validateRequest()
    if (!session && !user) {
        return redirect('/protected')
    }


    // CURRENT USERNAME SEARCH
    const currentUser = await db.user.findFirst({
        where: { id: user.id },
        select: {
            amazonHistory: true,
            bookStoreHistory: true,
            instagramHistory: true,
            mercadoLibreHistory: true,
            _count: true,
        }
    })

    const usernameSearch = {
        instagram: currentUser?.instagramHistory?.list.length ?? 0,
        amazon: currentUser?.amazonHistory?.list.length ?? 0,
        bookStore: currentUser?.bookStoreHistory?.list.length ?? 0,
        mercadoLibre: currentUser?.mercadoLibreHistory?.list.length ?? 0,
    }

    const maxSearch = Math.max(...(Object.values(usernameSearch)))
    const currentUsername = user.username
    const cleanDataUsername = [
        {
            "subject": TYPE_RADAR.INSTAGRAM,
            [`${currentUsername}`]: usernameSearch.instagram,
            "fullMark": maxSearch
        },
        {
            "subject": TYPE_RADAR.AMAZON,
            [`${currentUsername}`]: usernameSearch.amazon,
            "fullMark": maxSearch
        },
        {
            "subject": TYPE_RADAR.MERCADO_LIBRE,
            [`${currentUsername}`]: usernameSearch.mercadoLibre,
            "fullMark": maxSearch
        },
        {
            "subject": TYPE_RADAR.BOOK_STORE,
            [`${currentUsername}`]: usernameSearch.bookStore,
            "fullMark": maxSearch
        },
    ]
    const uniqueUser = [{
        username: user.username
    }]

    return (
        <Card className='w-full xl:w-[625px] relative'>
            <CardHeader>
                <CardTitle>Mis busquedas</CardTitle>
            </CardHeader>
            <CardContent>
                <Recharts users={uniqueUser} data={cleanDataUsername} max={maxSearch} />
            </CardContent>
            <CardFooter className='bueno gap-4 justify-center items-center w-full'>
                <p><span className='font-bold'>Instagram: </span>{usernameSearch.instagram}</p>
                <p><span className='font-bold'>Amazon: </span>{usernameSearch.amazon}</p>
                <p><span className='font-bold'>Tienda de Libros: </span>{usernameSearch.bookStore}</p>
                <p><span className='font-bold'>Mercado Libre: </span>{usernameSearch.mercadoLibre}</p>
            </CardFooter>

        </Card>
    )
}