import React from 'react'
import './styles.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Skeleton } from './ui/skeleton'

type Props = {}

const NavbarLink = dynamic(
  () => import('./navbar-link'),
  {
    loading: () => <li>
      <Skeleton className="w-[100px] h-[60px] rounded-full" />
    </li>,
    ssr: false
  }
)

export const hrefs = ['instagram', 'amazon', 'mercado-libre', 'book-store', 'bot-detect']

const routes = [
  {
    href: hrefs[0],
    title: 'Instagram'
  },
  {
    href: hrefs[1],
    title: 'Amazon'
  },
  {
    href: hrefs[2],
    title: 'Mercado Libre'
  },
  {
    href: hrefs[3],
    title: 'Book Store'
  },
  {
    href: hrefs[4],
    title: 'Bot Detect'
  },
]

const Navbar = (props: Props) => {
  // const currentRoute = 
  console.log(props, 'this is')
  return (
    <ul>
      {routes.map(({ href, title }) => (
        <NavbarLink key={href} href={href} title={title} />
      ))}
    </ul>
  )
}

export default Navbar