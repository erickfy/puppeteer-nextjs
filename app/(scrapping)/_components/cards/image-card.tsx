'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

type Props = { src: string, alt: string }

export default function ImageCard({ src, alt }: Props) {
    return (
        <Card className='flex justify-center items-center p-6'>
            <CardContent className="relative flex aspect-square items-center justify-center p-6 max-w-sm min-w-72">
                <div className="w-full h-full">
                    <Image
                        src={src}
                        objectFit="cover"
                        layout="fill"
                        alt={`description ${alt} image`}
                        className="z-0"
                    />
                </div>
            </CardContent>
        </Card>
    )
}