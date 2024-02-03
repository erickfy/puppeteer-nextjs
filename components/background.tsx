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
    const currentBackground = getBG()
    console.log(pathname)
    const isAuth = isAuthRoute(pathname)
    console.log(isAuth)

    const background = useMemo(() => {

        if (isAuth) {
            setBG(BACKGROUND.LOGIN)
        } else {
            setBG(BACKGROUND.SCRAPPING)
        }
        console.log(getBG())

        return getBG()
    }, [isAuth])

    console.log(background)
    if (BACKGROUND.LOGIN === background)
        return (<div className={cn(styles.auth_background, 'thereis')}></div>)
    else if (BACKGROUND.SCRAPPING === background) {
        return (<div className={cn(styles.scrapping_background, 'thereis_')}>
        </div>)
    }
}

