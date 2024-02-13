import { OWNER } from '@/lib/constants'
import React from 'react'

type Props = { children: React.ReactNode }

export const metadata = {
    title: 'Registrate y Scrapea paginas web',
    description: `Pagina para scrapear paginas web \n Creado por
    ${OWNER}
    `
}

export default function Layout({ children }: Props) {
    return (
        <div className='background-auth'>{children}</div>
    )
}