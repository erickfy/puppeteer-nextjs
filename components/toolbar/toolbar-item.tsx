'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import styles from './styles.module.scss'
import { IconType } from 'react-icons/lib'

type Props = { href: string, title: string, icon: IconType }

const ToolbarItem = ({ href, title, icon: Icon }: Props) => {
  const pathname = usePathname()
  const currentPath = '/' + pathname.split('/')[1]
  let isActive = currentPath === href

  return (
    <li key={title} className={cn(isActive, styles.navbar__item)}>
      <Link href={href} className={styles.navbar__link} id={`${href.split('/')[1]}-route`}>
        <Icon className={cn('h-8 w-8', isActive ? styles.active : null)} />
        <span className={cn(isActive ? styles.active : styles.no_active)}>
          {title}
        </span>
      </Link>
    </li>
  )
}

export default ToolbarItem