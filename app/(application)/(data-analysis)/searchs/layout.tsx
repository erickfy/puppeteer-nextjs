import Heading from '@/components/heading'
import React from 'react'
import Recharts from '../_components/recharts'
import { redirect } from 'next/navigation'
import { validateRequest } from '@/lib/auth'
import { db } from '@/lib/db'
import { USER_ROLE } from '@prisma/client'
import AdminOnly from '@/components/admin-only'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import fs from 'fs'
import path from 'path'

type Props = {
    children: React.ReactNode
    scrappings: React.ReactNode
}

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

export default async function SearchsLayout({ children, scrappings }: Props) {

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
        <div className='flex gap-4 flex-col relative'>

            <div className='grid grid-cols-1'>
                {user.role !== USER_ROLE.ADMIN ?
                    <AdminOnly
                        title='Upps! Pagina solo para administradores'
                        description='Se requiere iniciar sesion como administrador'
                    /> :
                    <>
                        <Card>
                            <CardHeader>
                                <Heading
                                    title='Scrappings mas y menos buscados'
                                />
                            </CardHeader>
                            <CardContent>
                                {children}
                            </CardContent>
                        </Card>
                    </>
                }

            </div>

        </div>
    )
}