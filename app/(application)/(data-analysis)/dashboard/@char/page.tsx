import React from 'react'
import { redirect } from 'next/navigation'
import { validateRequest } from '@/lib/auth'
import { db } from '@/lib/db'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import dynamic from 'next/dynamic'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Skeleton } from '@/components/ui/skeleton'

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

interface DynamicToolTipProps {
    routeHandler: 'instagram' | 'amazon' | 'mercado-libre' | 'book-store';
    titleToolTip: string;
}

const DynamicToolTip = dynamic<DynamicToolTipProps>(
    () => import('../../_components/tooltip'),
    {
        loading: () =>
            <Skeleton className='h-4 w-4 flex justify-center items-center'>
                <ReloadIcon className="h-4 w-4 animate-spin" />
            </Skeleton>,
        ssr: false
    }
)

const DynamicChar = dynamic(() => import('../../_components/recharts'),
    {
        loading: () => <Skeleton className='h-[250px] w-[730px] flex justify-center items-center'>
            <ReloadIcon className='h-4 w-4 animate-spin' />
        </Skeleton>,
        ssr: false
    }
)

export default async function DashboardChar() {
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
            <CardContent className='flex justify-center  items-center w-auto'>
                <DynamicChar users={uniqueUser} data={cleanDataUsername} max={maxSearch === 0 ? 10 : maxSearch} />
            </CardContent>
            <CardFooter className='gap-4 flex-col sm:flex-row justify-center items-center w-full'>
                <p className='flex justify-center items-center'>
                    <span className='font-semibold'>Instagram: </span>
                    {usernameSearch.instagram}
                    {usernameSearch.instagram !== 0 &&
                        <DynamicToolTip routeHandler='instagram' titleToolTip='Instagram' />
                    }
                </p>
                <p className='flex justify-center items-center'>
                    <span className='font-semibold'>Amazon: </span>
                    {usernameSearch.amazon}
                    {usernameSearch.amazon !== 0 &&
                        <DynamicToolTip routeHandler='amazon' titleToolTip='Amazon' />
                    }
                </p>
                <p className='flex justify-center items-center'>
                    <span className='font-semibold'>Tienda de Libros: </span>
                    {usernameSearch.bookStore}
                    {usernameSearch.bookStore !== 0 &&
                        <DynamicToolTip routeHandler='book-store' titleToolTip='Tienda de Libros' />
                    }
                </p>
                <p className='flex justify-center items-center'>
                    <span className='font-semibold'>Mercado Libre: </span>
                    {usernameSearch.mercadoLibre}
                    {usernameSearch.mercadoLibre !== 0 &&
                        <DynamicToolTip routeHandler='mercado-libre' titleToolTip='Mercado Libre' />
                    }
                </p>
            </CardFooter>
        </Card>
    )
}