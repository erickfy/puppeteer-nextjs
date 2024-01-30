'use client'

import Link from 'next/link'
import React from 'react'
import { hrefs } from './test.navbar'
import { usePathname } from 'next/navigation'

type Props = { href: string, title: string }

const NavbarLink = ({ href, title }: Props) => {
  const pathname = usePathname()
  const currentPath = pathname.split('/')[1]
  
  let isActive = 'no-active'
  if (currentPath === href) {
    isActive = 'active'
  }

  return (
    <li key={title} className={isActive}>
      <Link href={href}>{title}</Link>
    </li>
  )
}

export default NavbarLink