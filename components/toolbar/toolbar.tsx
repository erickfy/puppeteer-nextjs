'use client'

import React from 'react'
import styles from './styles.module.scss'
import dynamic from 'next/dynamic'
import { Skeleton } from '../ui/skeleton'
import { FaAmazon, FaInstagram, FaRobot } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import { BiStoreAlt } from "react-icons/bi";
import { routes } from '@/routes'


const ToolbarItem = dynamic(
  () => import('./toolbar-item'),
  {
    loading: () => <li className={styles.navbar__menu}>
      <Skeleton className="w-full h-[60px]" />
    </li>,
    ssr: false
  }
)


const toolbarRoutes = [
  {
    href: routes.instagram,
    title: 'Instagram',
    icon: FaInstagram
  },
  {
    href: routes.amazon,
    title: 'Amazon',
    icon: FaAmazon
  },
  {
    href: routes.mercadoLibre,
    title: 'Mercado Libre',
    icon: SiMercadopago
  },
  {
    href: routes.bookStore,
    title: 'Book Store',
    icon: BiStoreAlt
  },
  {
    href: routes.botDetect,
    title: 'Bot Detect',
    icon: FaRobot
  },
]

/**
 * DOCS
 * Styles Sass: https://nextjs.org/docs/app/building-your-application/styling/sass
 * 
 */

const Toolbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={styles.navbar__menu}>
          {toolbarRoutes.map(({ title, href, icon }) => (
            <ToolbarItem key={href} href={href} title={title} icon={icon} />
          ))}

        </ul>
      </nav>
    </header>

  )
}

export default Toolbar

