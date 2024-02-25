import ClientOnly from '@/components/client-only';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ReloadIcon } from '@radix-ui/react-icons';
import React, { Suspense } from 'react'

type Props = {
    children: React.ReactNode;
    char: React.ReactNode;
    dialog: React.ReactNode;
}

export default function Layout({
    children,
    char,
    dialog
}: Props) {
    return (
        <>
            <div className='flex flex-wrap gap-4 '>
                <ClientOnly
                    fallback={
                        (<>
                            <Card className='w-full xl:w-[625px] h-[200px] relative flex justify-center items-center'>
                                <span>Cargando busquedas...</span>
                                <ReloadIcon className='w-4 h-4 animate-spin' />
                            </Card>
                            <Card className='w-full xl:w-[625px] h-[100px] relative overflow-hidden max-h-[400px] flex justify-center items-center'>
                                <span>Cargando perfil...</span>
                                <ReloadIcon className='w-4 h-4 animate-spin' />
                            </Card>
                        </>)
                    }
                >
                    {char}
                    {children}
                </ClientOnly>
            </div>
            {dialog}
        </>
    )
}