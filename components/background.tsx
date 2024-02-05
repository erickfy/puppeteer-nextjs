'use client'

import { BACKGROUND } from '@/hooks/type-hooks'
import { useBackground } from '@/hooks/useBackground'
import { authRoutes } from '@/routes'
import { usePathname } from 'next/navigation'
import styles from './bg.module.css'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
/**
 * receve a universal hook to change the background
 */

type Props = {}
function isAuthRoute(path: string) {
    return authRoutes.includes(path)
}

export default function Background({ }: Props) {
    const { getBG, setBG } = useBackground()
    const pathname = usePathname()
    const isAuth = isAuthRoute(pathname)

    const background = useMemo(() => {

        if (isAuth) {
            setBG(BACKGROUND.LOGIN)
        } else {
            setBG(BACKGROUND.SCRAPPING)
        }

        return getBG()
    }, [isAuth, getBG(), setBG])

    return (
        <div
            className={cn(BACKGROUND.LOGIN === background ?
                styles.auth_background : styles.scrapping_background)}>
        </div>
    )

}

