import Container from '@/components/container'
import React from 'react'

type Props = { children: React.ReactNode }

export default function Layout({ children }: Props) {
    return (
        <div className="md:pl-56 pt-[80px] h-full w-full background-searchs">
            <Container>
                {children}
            </Container>
        </div>
    )
}