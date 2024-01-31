import Logo from '@/components/logo'
import Link from 'next/link'
import React from 'react'

type Props = { params: { image: string } }

export default function ImagePage({ params: { image } }: Props) {
    console.log('something', image)
    return (
        <div className='flex flex-col gap-2'>
            <p>{image} ImagePage</p>

            <Logo />
            <Link href={'/instagram'} className='font-bold'>Default route</Link>
        </div>
    )
}