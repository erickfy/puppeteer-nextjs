'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

type Props = { src: string }

export default function ImageCard({ src }: Props) {
    return (
        <Card>
            <CardContent className="relative flex aspect-square items-center justify-center p-6 max-w-sm min-w-72">
                <div className="w-full h-full">
                    <Image
                        src={src}
                        objectFit="cover"
                        layout="fill"
                        alt="Descripción de la imagen"
                        className="z-0"
                    />
                </div>
            </CardContent>
        </Card>)
}