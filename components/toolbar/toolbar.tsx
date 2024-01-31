'use client'

import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Skeleton } from '../ui/skeleton'
import { Menu } from 'lucide-react'
import { FaAmazon, FaInstagram, FaRobot } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import { BiStoreAlt } from "react-icons/bi";


const ToolbarItem = dynamic(
  () => import('./toolbar-item'),
  {
    loading: () => <li className={styles.navbar__menu}>
      <Skeleton className="w-[100px] h-[60px] rounded-full" />
    </li>,
    ssr: false
  }
)

export const hrefs = ['/instagram', '/amazon', '/mercado-libre', '/book-store', '/bot-detect']

const routes = [
  {
    href: hrefs[0],
    title: 'Instagram',
    icon: FaInstagram
  },
  {
    href: hrefs[1],
    title: 'Amazon',
    icon: FaAmazon
  },
  {
    href: hrefs[2],
    title: 'Mercado Libre',
    icon: SiMercadopago
  },
  {
    href: hrefs[3],
    title: 'Book Store',
    icon: BiStoreAlt
  },
  {
    href: hrefs[4],
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
          {routes.map(({ title, href, icon }) => (
            <ToolbarItem key={href} href={href} title={title} icon={icon} />
          ))}

        </ul>
      </nav>
    </header>

  )
}

export default Toolbar

